new gridjs.Grid({
  columns: [{name:"Protein id",formatter:(cell)=>gridjs.html(cell)},"Name","Length","# Hotspot islands","# Hotspots",
    "# Defence targets","Targeted systems","MSA depth","hmmscan hit","hmmscan hit (db)"],
  className:{th:'',td:'table-hover',table:'table-hover'},
  style:{table:{'font-size':'0.95rem'},th:{'padding':'0.35rem 0.6rem','font-weight':'500',
    'min-width':'100px','color':'black'},td:{'padding':'0.35rem 0.6rem','min-width':'100px',
      'max-width':'210px','white-space':'nowrap','overflow':'hidden','text-overflow':'ellipsis'}},
  fixedHeader:true,pagination:{limit:15},sort:true,resizable:true,search:true,
  data:()=>new Promise(resolve=>{fetch('/get_table/json/ad4udb-phage_protein_families').then(r=>r.json()).then(resp=>{setTimeout(()=>{resolve(resp.map(row=>[row["Protein id"],row["Name"],row["Length"],row["# Hotspot islands"],row["# Hotspots"],row["# Defence targets"],row["Targeted systems"],row["MSA depth"],row["hmmscan hit"],row["hmmscan hit (db)"]]));},1000);});}),
  language:{loading:'Loading…'}
}).render(document.getElementById("pb_table"));

new gridjs.Grid({
  columns:[{name:"Defence system",formatter:(cell)=>gridjs.html(cell)},{name:"Defence protein",formatter:(cell)=>gridjs.html(cell)},{name:"Defence protein id",formatter:(cell)=>gridjs.html(cell)},"Length (aa)","Pfam domains","# Binder candidates"],
  className:{th:'',td:'table-hover',table:'table-hover'},
  style:{table:{'font-size':'0.95rem'},th:{'padding':'0.35rem 0.6rem','font-weight':'500',
    'min-width':'100px','color':'black'},td:{'padding':'0.35rem 0.6rem','min-width':'100px',
      'max-width':'210px','white-space':'nowrap','overflow':'hidden','text-overflow':'ellipsis'}},
  fixedHeader:true,pagination:{limit:15},sort:true,resizable:true,search:true,
  data:()=>new Promise(resolve=>{fetch('/get_table/json/ad4udb-defence_proteins').then(r=>r.json()).then(resp=>{setTimeout(()=>{resolve(resp.map(row=>[row["Defence system"],row["Defence protein"],row["Defence protein id"],row["Length (aa)"],row["Pfam domains"],row["# Binder candidates"]]));},1000);});}),
  language:{loading:'Loading…'}
}).render(document.getElementById("df_table"));