new gridjs.Grid({
  columns: [
    {name: "Cluster",
      formatter: (cell) => gridjs.html(cell)
    },"Name", "Length", "hmmscan hit", "hmmscan hit (db)", "Pfam domains", "Topology",
     "# Genomes", "# Proteome communities", "# Hotspot com.", "Defence As. Score Q"],
    className: {
    th: '',
    td: 'table-hover',
    table: 'table-hover'
  },
    style: {
    table: {'font-size': '0.95rem'},
    th: {
    'padding': '0.35rem 0.6rem',
    'font-weight': '500',
    'min-width': '100px',
    'font-weight': '500',
    'color': 'black'
    },
    td:{
     'padding': '0.35rem 0.6rem',
          'min-width': '100px',
          'max-width': '210px',
          'white-space': 'nowrap',
          'overflow': 'hidden',
          'text-overflow': 'ellipsis'
    }
  },
  fixedHeader: true,
  pagination: {
  limit: 20},
  sort: true,
  resizable: true,
  search: true,
  data: () => new Promise(resolve => {
    fetch('/get_table/json/ilund4udb_phage_protein_families')
      .then(r => r.json())
      .then(resp => {
        setTimeout(() => {
          resolve(resp.map(row => [
            row["Cluster"],row["Name"], row["Length"], row["hmmscan hit"], row["hmmscan hit (db)"],
            row["Pfam domains"], row["Topology"], row["# Genomes"],row["# Proteome communities"],row["# Hotspot com."],row["Defence As. Score Q"]
          ]));
        }, 1000);
      });
  }),
  language: { loading: 'Loading…' }
}).render(document.getElementById("pf_table"));


new gridjs.Grid({
  columns: [
    {name: "ID",
      formatter: (cell) => gridjs.html(cell)
    },"# CDS", "Length", {name: "Proteome Community",
      formatter: (cell) => gridjs.html(cell)
    },"# Islands", "Host", "Taxonomy"],
    className: {
    th: '',
    td: 'table-hover',
    table: 'table-hover'
  },
    style: {
    table: {'font-size': '0.95rem'},
    th: {
    'padding': '0.35rem 0.6rem',
    'font-weight': '500',
    'min-width': '100px',
    'font-weight': '500',
    'color': 'black'
    },
    td:{
     'padding': '0.35rem 0.6rem',
          'min-width': '100px',
          'max-width': '210px',
          'white-space': 'nowrap',
          'overflow': 'hidden',
          'text-overflow': 'ellipsis'
    }
  },
  fixedHeader: true,
  pagination: {
  limit: 20},
  sort: true,
  resizable: true,
  search: true,
  data: () => new Promise(resolve => {
    fetch('/get_table/json/ilund4udb_phages')
      .then(r => r.json())
      .then(resp => {
        setTimeout(() => {
          resolve(resp.map(row => [
            row["ID"],row["# CDS"], row["Length"], row["Proteome Community"], row["# Islands"],
            row["Host"], row["Taxonomy"]
          ]));
        }, 1000);
      });
  }),
  language: { loading: 'Loading…' }
}).render(document.getElementById("p_table"));
