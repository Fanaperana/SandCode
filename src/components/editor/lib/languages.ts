const languages = [
    {
        name: "apl",
        extension: [".apl"]
    },
    {
        name: "asciiArmor",
        extension: [".asc"]
    },
    {
        name: "asterisk",
        extension: [".conf",".ael",".agi"]
    },
    {
        name: "c",
        extension: [".c"]
    },
    {
        name: "csharp",
        extension: [".cs"]
    },
    {
        name: "scala",
        extension: [".scala"]
    },
    {
        name: "kotlin",
        extension: [".kt"]
    },
    {
        name: "shader",
        extension: [".shader",".glsl"]
    },
    {
        name: "nesC",
        extension: [".nc"]
    },
    {
        name: "objectiveC",
        extension: [".m"]
    },
    {
        name: "objectiveCpp",
        extension: [".mm"]
    },
    {
        name: "squirrel",
        extension: [".nut"]
    },
    {
        name: "ceylon",
        extension: [".ceylon"]
    },
    {
        name: "dart",
        extension: [".dart"]
    },
    {
        name: "cmake",
        extension: [".cmake",".cmake.in"]
    },
    {
        name: "cobol",
        extension: [".cob",".cbl",".ccp",".cobol",".cpy"]
    },
    {
        name: "commonLisp",
        extension: [".lisp",".asd",".cl",".l"]
    },
    {
        name: "crystal",
        extension: [".cr"]
    },
    {
        name: "cypher",
        extension: [".cyp",".cypher"]
    },
    {
        name: "d",
        extension: [".d"]
    },
    {
        name: "diff",
        extension: [".diff",".patch"]
    },
    {
        name: "dtd",
        extension: [".dtd"]
    },
    {
        name: "dylan",
        extension: [".dylan",".dyl",".intr",".lid"]
    },
    {
        name: "ebnf",
        extension: [".ebnf"]
    },
    {
        name: "ecl",
        extension: [".ecl"]
    },
    {
        name: "eiffel",
        extension: [".e",".eif"]
    },
    {
        name: "elm",
        extension: [".elm"]
    },
    {
        name: "factor",
        extension: [".factor"]
    },
    {
        name: "fcl",
        extension: [".fcl"]
    },
    {
        name: "forth",
        extension: [".forth",".frt",".fs",".fth",".4th"]
    },
    {
        name: "fortran",
        extension: [".f",".f77",".f90",".f95",".f03",".for",".ftn",".fpp"]
    },
    {
        name: "gas",
        extension: [".s",".S"]
    },
    {
        name: "gherkin",
        extension: [".feature"]
    },
    {
        name: "groovy",
        extension: [".groovy",".gvy",".gy",".gsh"]
    },
    {
        name: "haskell",
        extension: [".hs",".lhs"]
    },
    {
        name: "haxe",
        extension: [".hx",".hxsl"]
    },
    {
        name: "http",
        extension: [".http"]
    },
    {
        name: "idl",
        extension: [".pro"]
    },
    {
        name: "jinja2",
        extension: [".jinja2",".j2"]
    },
    {
        name: "mathematica",
        extension: [".nb", ".ma", ".wl"]
    },
    {
        name: "mbox",
        extension: [".mbox"]
    },
    {
        name: "mirc",
        extension: [".mrc"]
    },
    {
        name: "modelica",
        extension: [".mo"]
    },
    {
        name: "mscgen",
        extension: [".mscgen", ".mscin", ".msc"]
    },
    {
        name: "mumps",
        extension: [".mps", ".m"]
    },
    {
        name: "nsis",
        extension: [".nsi", ".nsh"]
    },
    {
        name: "ntriples",
        extension: [".nt"]
    },
    {
        name: "octave",
        extension: [".m"]
    },
    {
        name: "oz",
        extension: [".oz"]
    },
    {
        name: "pig",
        extension: [".pig"]
    },
    {
        name: "properties",
        extension: [".properties"]
    },
    {
        name: "protobuf",
        extension: [".proto"]
    },
    {
        name: "puppet",
        extension: [".pp"]
    },
    {
        name: "q",
        extension: [".q"]
    },
    {
        name: "sas",
        extension: [".sas"]
    },
    {
        name: "sass",
        extension: [".sass", ".scss"]
    },
    {
        name: "sieve",
        extension: [".siv", ".sieve"]
    },
    {
        name: "smalltalk",
        extension: [".st"]
    },
    {
        name: "solr",
        extension: [".solr"]
    },
    {
        name: "sparql",
        extension: [".sparql", ".rq"]
    },
    {
        name: "spreadsheet",
        extension: [".ods", ".xls", ".xlsx"]
    },
    {
        name: "stex",
        extension: [".stex"]
    },
    {
        name: "textile",
        extension: [".textile"]
    },
    {
        name: "tiddlyWiki",
        extension: [".tid", ".tiddly"]
    },
    {
        name: "tiki",
        extension: [".tiki"]
    },
    {
        name: "troff",
        extension: [".1", ".1in", ".1m", ".1x", ".2", ".3", ".3in", ".3m", ".3p", ".3pm", ".3qt", ".3x", ".4", ".5", ".6", ".7", ".8", ".9", ".l", ".man", ".mdoc", ".me", ".ms", ".n", ".nr", ".rno", ".tmac"]
    },
    {
        name: "ttcn",
        extension: [".ttcn","ttcn3"]
    },
    {
        name: "turtle",
        extension: [".ttl"]
    },
    {
        name: "velocity",
        extension: [".vm"]
    },
    {
        name: "verilog",
        extension: [".v", ".vh", ".sv"]
    },
    {
        name: "vhdl",
        extension: [".vhd", ".vhdl"]
    },
    {
        name: "webIDL",
        extension: [".webidl"]
    },
    {
        name: "xQuery",
        extension: [".xq", ".xquery"]
    },
    {
        name: "yacas",
        extension: [".ys"]
    },
    {
        name: "z80",
        extension: [".z80"]
    },
    {
        name: "wast",
        extension: [".wast", ".wat"]
    },
    {
        name: "javascript",
        extension: [".js"]
    },
    {
        name: "jsx",
        extension: [".jsx"]
    },
    {
        name: "typescript",
        extension: [".ts"]
    },
    {
        name: "tsx",
        extension: [".tsx"]
    },
    {
        name: "json",
        extension: [".json"]
    },
    {
        name: "html",
        extension: [".html", ".htm"]
    },
    {
        name: "css",
        extension: [".css"]
    },
    {
        name: "python",
        extension: [".py"]
    },
    {
        name: "markdown",
        extension: [".md", ".markdown"]
    },
    {
        name: "xml",
        extension: [".xml"]
    },
    {
        name: "sql",
        extension: [".sql"]
    },
    {
        name: "mysql",
        extension: [".mysql"]
    },
    {
        name: "pgsql",
        extension: [".pgsql"]
    },
    {
        name: "java",
        extension: [".java"]
    },
    {
        name: "rust",
        extension: [".rs"]
    },
    {
        name: "cpp",
        extension: [".cpp", ".cc", ".cxx", ".h", ".hpp"]
    },
    {
        name: "lezer",
        extension: [".lz"]
    },
    {
        name: "php",
        extension: [".php", ".php3", ".php4", ".php5", ".phtml"]
    },
    {
        name: "go",
        extension: [".go"]
    },
    {
        name: "shell",
        extension: [".sh", ".bash", ".zsh"]
    },
    {
        name: "lua",
        extension: [".lua"]
    },
    {
        name: "swift",
        extension: [".swift"]
    },
    {
        name: "tcl",
        extension: [".tcl", ".adp", ".tm"]
    },
    {
        name: "yaml",
        extension: [".yaml", ".yml"]
    },
    {
        name: "vb",
        extension: [".vb", ".bas"]
    },
    {
        name: "powershell",
        extension: [".ps1", ".psm1", ".psd1"]
    },
    {
        name: "brainfuck",
        extension: [".bf"]
    },
    {
        name: "stylus",
        extension: [".styl"]
    },
    {
        name: "erlang",
        extension: [".erl", ".hrl"]
    },
    {
        name: "nginx",
        extension: [".nginx-conf", ".nginxconf"]
    },
    {
        name: "perl",
        extension: [".pl", ".pm", ".pod", ".t"]
    },
    {
        name: "ruby",
        extension: [".rb", ".rhtml", ".rjs", ".rxml", ".erb", ".rake", ".gemspec", ".rbx", ".duby"]
    },
    {
        name: "pascal",
        extension: [".pas", ".dpr", ".dpk", ".inc"]
    },
    {
        name: "livescript",
        extension: [".ls"]
    },
    {
        name: "less",
        extension: [".less"]
    },
    {
        name: "scheme",
        extension: [".scm", ".ss"]
    },
    {
        name: "toml",
        extension: [".toml"]
    },
    {
        name: "vbscript",
        extension: [".vbs", ".vb"]
    },
    {
        name: "clojure",
        extension: [".clj", ".cljs", ".clojure"]
    },
    {
        name: "coffeescript",
        extension: [".coffee", ".cson", ".iced"]
    },
    {
        name: "julia",
        extension: [".jl"]
    },
    {
        name: "dockerfile",
        extension: [".dockerfile"]
    },
    {
        name: "r",
        extension: [".r",".R"]
    }
];

export default languages;