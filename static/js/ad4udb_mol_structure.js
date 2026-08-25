/*
 * AD4u Mol* viewer
 * static/js/ad4udb_mol_structure.js
 *
 * Requires molstar.js to be loaded before this file.
 *
 * Example HTML:
 *
 * <div class="molstar-frame">
 *     <div
 *         id="molstar-1"
 *         class="molstar-viewer"
 *         data-cif="/files/ad4udb/cifs_validated/model.cif">
 *     </div>
 * </div>
 */

(function () {
    "use strict";


    // ============================================================
    // Global configuration
    // ============================================================

    const CONFIG = {

        // Chain IDs
        chainA: "A",
        chainB: "B",

        // Chain colors
        chainAColor: "#9e9a92",
        chainBColor: "#d8db36",

        // Used for chains other than A/B
        defaultColor: "#B8BEC6",

        // Viewer background
        backgroundColor: "#FFFFFF",

        // --------------------------------------------------------
        // Outline settings
        // --------------------------------------------------------
        //
        // Smaller scale = thinner outline.
        //
        // Suggested values:
        //   0.25 = very thin
        //   0.40 = thin
        //   0.50 = moderate
        //   1.00 = thick/default-like
        //
        outlineScale: 0.40,

        // Controls which depth differences generate an outline.
        outlineThreshold: 0.33,

        // Black
        outlineColor: 0x000000,

        outlineIncludeTransparent: true,

        // Which CIF chain identifier to use.
        //
        // Usually correct for AlphaFold/mmCIF:
        //     label_asym_id
        //
        // Alternative:
        //     auth_asym_id
        //
        chainField: "label_asym_id",

        // Representation
        representation: "cartoon",

        // Load viewer before it actually enters viewport.
        // Useful so the structure is ready when user scrolls to it.
        lazyLoadMargin: "300px",

        // Mol* UI options
        viewerOptions: {

            layoutIsExpanded: false,

            layoutShowControls: false,
            layoutShowRemoteState: false,
            layoutShowSequence: false,
            layoutShowLog: false,
            layoutShowLeftPanel: false,

            viewportShowExpand: true,
            viewportShowSelectionMode: false,
            viewportShowAnimation: false
        }
    };


    // ============================================================
    // Store created viewers
    // ============================================================

    const viewers = new Map();


    // ============================================================
    // Utility
    // ============================================================

    function getOption(element, dataName, fallback) {

        const value = element.dataset[dataName];

        if (value === undefined || value === "") {
            return fallback;
        }

        return value;
    }


    function chainSelector(field, chainId) {

        return {
            [field]: chainId
        };
    }


    // ============================================================
    // Apply custom thin outline
    // ============================================================

    function applyOutlineStyle(viewer) {

        const canvas3d = viewer.plugin.canvas3d;

        if (!canvas3d) {
            console.warn("Mol*: canvas3d unavailable; outline not applied.");
            return;
        }


        /*
         * Preserve the other post-processing settings generated
         * by Mol* / MolViewSpec and only replace the outline.
         */
        const currentPostprocessing =
            canvas3d.props.postprocessing || {};


        canvas3d.setProps({

            postprocessing: {

                ...currentPostprocessing,

                outline: {

                    name: "on",

                    params: {

                        scale: CONFIG.outlineScale,

                        threshold: CONFIG.outlineThreshold,

                        color: CONFIG.outlineColor,

                        includeTransparent:
                            CONFIG.outlineIncludeTransparent
                    }
                }
            }
        });
    }


    // ============================================================
    // Build MolViewSpec
    // ============================================================

    function buildStructureView(element, cifUrl) {

        const chainA = getOption(
            element,
            "chainA",
            CONFIG.chainA
        );


        const chainB = getOption(
            element,
            "chainB",
            CONFIG.chainB
        );


        const colorA = getOption(
            element,
            "colorA",
            CONFIG.chainAColor
        );


        const colorB = getOption(
            element,
            "colorB",
            CONFIG.chainBColor
        );


        const defaultColor = getOption(
            element,
            "defaultColor",
            CONFIG.defaultColor
        );


        const backgroundColor = getOption(
            element,
            "background",
            CONFIG.backgroundColor
        );


        const chainField = getOption(
            element,
            "chainField",
            CONFIG.chainField
        );


        if (
            chainField !== "label_asym_id" &&
            chainField !== "auth_asym_id"
        ) {

            throw new Error(
                "Unsupported chain field: " + chainField
            );
        }


        // --------------------------------------------------------
        // Create MVS builder
        // --------------------------------------------------------

        const builder =
            molstar.PluginExtensions.mvs.MVSData.createBuilder();


        // --------------------------------------------------------
        // Canvas
        //
        // Background + molecular outline
        // --------------------------------------------------------

        builder.canvas({

            background_color: backgroundColor,

            custom: {

                molstar_postprocessing: {

                    enable_outline: true
                }
            }
        });


        // --------------------------------------------------------
        // Load CIF
        // --------------------------------------------------------

        const structure = builder

            .download({
                url: cifUrl
            })

            .parse({
                format: "mmcif"
            })

            .modelStructure({});


        // --------------------------------------------------------
        // Main protein representation
        // --------------------------------------------------------

        const representation = structure

            .component({
                selector: "polymer"
            })

            .representation({
                type: CONFIG.representation
            });


        // --------------------------------------------------------
        // Default color
        //
        // Important because if a structure contains C, D, etc.,
        // those chains will still be visible.
        // --------------------------------------------------------

        representation.color({
            color: defaultColor
        });


        // --------------------------------------------------------
        // Chain A
        // --------------------------------------------------------

        representation.color({

            selector: chainSelector(
                chainField,
                chainA
            ),

            color: colorA
        });


        // --------------------------------------------------------
        // Chain B
        // --------------------------------------------------------

        representation.color({

            selector: chainSelector(
                chainField,
                chainB
            ),

            color: colorB
        });


        return builder.getState();
    }


    // ============================================================
    // Create one viewer
    // ============================================================

    async function createViewer(element) {

        // Prevent duplicate initialization
        if (
            element.dataset.loaded === "true" ||
            element.dataset.loading === "true"
        ) {
            return;
        }


        const cifUrl = element.dataset.cif;


        if (!cifUrl) {

            console.error(
                "Mol*: data-cif is missing:",
                element
            );

            return;
        }


        // Give viewer an ID if it doesn't already have one
        if (!element.id) {

            element.id =
                "molstar-" +
                Math.random()
                    .toString(36)
                    .substring(2, 10);
        }


        element.dataset.loading = "true";


        try {

            // ----------------------------------------------------
            // Create Mol* viewer
            // ----------------------------------------------------

            const viewer = await molstar.Viewer.create(
                element.id,
                CONFIG.viewerOptions
            );


            // ----------------------------------------------------
            // Build customized molecular view
            // ----------------------------------------------------

            const mvsData = buildStructureView(
                element,
                cifUrl
            );


            // ----------------------------------------------------
            // Load it into Mol*
            // ----------------------------------------------------

            await molstar.PluginExtensions.mvs.loadMVS(

                viewer.plugin,

                mvsData,

                {
                    sourceUrl: window.location.href,
                    sanityChecks: true,
                    replaceExisting: true
                }
            );


            // ----------------------------------------------------
            // Remove Mol* snapshot/date/time bar
            // ----------------------------------------------------

            viewer.plugin.managers.snapshot.clear();


            // ----------------------------------------------------
            // Apply thinner molecular outline
            // ----------------------------------------------------

            applyOutlineStyle(viewer);


            // ----------------------------------------------------
            // Save instance
            // ----------------------------------------------------

            viewers.set(
                element.id,
                viewer
            );


            element.molstarViewer = viewer;


            element.dataset.loaded = "true";
            element.dataset.loading = "false";


            console.debug(
                "Mol* loaded:",
                element.id,
                cifUrl
            );


        } catch (error) {

            element.dataset.loading = "false";
            element.dataset.loaded = "false";


            console.error(
                "Mol* failed to load:",
                cifUrl,
                error
            );


            // Optional visible error
            element.innerHTML = `

                <div style="
                    display:flex;
                    align-items:center;
                    justify-content:center;
                    color:#777;
                    font-size:14px;
                ">
                    Could not load structure
                </div>

            `;
        }
    }


    // ============================================================
    // Lazy loading
    // ============================================================

    let observer = null;


    function createObserver() {

        if (!("IntersectionObserver" in window)) {
            return null;
        }


        return new IntersectionObserver(

            function (entries) {

                entries.forEach(function (entry) {

                    if (!entry.isIntersecting) {
                        return;
                    }


                    const element = entry.target;


                    // Stop observing once loading starts
                    observer.unobserve(element);


                    createViewer(element);
                });
            },


            {
                root: null,

                rootMargin:
                    CONFIG.lazyLoadMargin + " 0px",

                threshold: 0.01
            }
        );
    }


    // ============================================================
    // Initialize all viewers
    // ============================================================

    function init(root = document) {

        const elements =
            root.querySelectorAll(
                ".molstar-viewer"
            );


        if (!elements.length) {
            return;
        }


        // Create lazy loader once
        if (!observer) {
            observer = createObserver();
        }


        elements.forEach(function (element) {

            if (
                element.dataset.loaded === "true" ||
                element.dataset.loading === "true"
            ) {
                return;
            }


            // Lazy loading supported
            if (observer) {

                observer.observe(element);

            } else {

                // Older browser fallback
                createViewer(element);
            }
        });
    }


    // ============================================================
    // Public API
    // ============================================================

    window.AD4uMolstar = {


        /*
         * Scan page for new .molstar-viewer elements.
         */
        init: init,


        /*
         * Immediately load a particular viewer.
         *
         * Example:
         *
         * AD4uMolstar.load("molstar-1");
         */
        load: function (id) {

            const element =

                typeof id === "string"

                    ? document.getElementById(id)

                    : id;


            if (!element) {

                console.error(
                    "Mol*: viewer not found:",
                    id
                );

                return;
            }


            return createViewer(element);
        },


        /*
         * Retrieve Mol* viewer instance.
         *
         * Example:
         *
         * const viewer =
         *     AD4uMolstar.getViewer("molstar-1");
         */
        getViewer: function (id) {

            return viewers.get(id);
        },


        /*
         * Access global settings.
         */
        config: CONFIG
    };


    // ============================================================
    // Automatic startup
    // ============================================================

    if (document.readyState === "loading") {

        document.addEventListener(

            "DOMContentLoaded",

            function () {
                init();
            }
        );

    } else {

        init();
    }

})();