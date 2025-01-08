import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "mega",
  password: "zokokfelara",
  port: 5432,
});
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
//app.use(express.static(".")); // otherwise layout.css doesn't work i don't know why...

let items = [];

app.get("/", async (req, res) => {
  try {
    const result = await db.query("SELECT concurso, to_char(n1, '00') as n1, to_char(n2, '00') as n2, to_char(n3, '00') as n3, to_char(n4, '00') n4, to_char(n5, '00') n5, to_char(n6, '00') n6 FROM sena ORDER BY concurso DESC");
    items = result.rows;

    res.render("index.ejs", {
      listTitle: "Mega Sena",
      listItems: items,      
    });
  } catch (err) {
    console.log(err);
  }
});
// ---------------------------------------graficos------------------------------
app.post("/vergrafico", async (req, res) => {
  try {
    const result = await db.query("SELECT r1, r2, r3, r4, r5, r6, r7, r8, r9, r10, r11, r12, r13, r14, r15, r16, r17, r18, r19, r20, r21, r22, r23, r24, r25, r26, r27, r28, r29, r30, r31, r32, r33, r34, r35, r36, r37, r38, r39, r40, r41, r42, r43, r44, r45, r46, r47, r48, r49, r50, r51, r52, r53, r54, r55, r56, r57, r58, r59, r60 FROM countall where id = (select max(id) from countall)");
    items = result.rows;
    console.log("no post vergrafico")
    res.render("charting.ejs", {
      listTitleGraph: "Grafico",
      listItemsGraph: items,      
    });
  } catch (err) {
    console.log(err);
  }
});

// ---------------------------------------datas------------------------------

app.post("/data", async (req, res) => {
    // const item = req.body.updatedItemTitle;
     const idday = req.body.datingday;
     const idmes = req.body.datingmonth;
     const idano = req.body.datingyear;
     console.log("inquirying " + idday);
     try {
       const result = await db.query("SELECT * FROM sena where dia = $1 and mes = $2 and ano = $3", [idday, idmes, idano] );
       items = result.rows;
   
       res.render("inquirydates.ejs", {
         listTitlec: "Data",
         listItemsc: items,
       });
     } catch (err) {
       console.log(err);
     }
   });

   app.post("/inquiry", async (req, res) => {
    // const item = req.body.updatedItemTitle;
     const idb = req.body.inquirying;
     console.log("dating " + idb);
     try {
       const result = await db.query("SELECT to_char(concurso, '0000') as concurso, to_char(n1, '00') as n1, to_char(n2, '00') as n2, to_char(n3, '00') as n3, to_char(n4, '00') as n4, to_char(n5, '00') as n5, to_char(n6, '00') as n6 FROM sena where concurso = $1", [idb] );
       items = result.rows;
   
       res.render("inquiry.ejs", {
         listTitleb: "Numero de concurso",
         listItemsb: items,
       });
     } catch (err) {
       console.log(err);
     }
   });

   app.post("/megasorteada", async (req, res) => {
    // const item = req.body.updatedItemTitle;
     const idn1 = req.body.n1;
     const idn2 = req.body.n2;
     const idn3 = req.body.n3;
     const idn4 = req.body.n4;
     const idn5 = req.body.n5;
     const idn6 = req.body.n6;
     console.log("sorteada " + idn1);
     try {
       const result = await db.query("SELECT * FROM sena where n1 = $1 and n2 = $2 and n3 = $3 and n4 = $4 and n5 = $5 and n6 = $6", [idn1, idn2, idn3, idn4, idn5, idn6] );
       items = result.rows;
   
       
       res.render("megacheck.ejs", {
         listTitled: "Sua aposta já foi sorteada... ",
         listItemsd: items,
       });
     } catch (err) {
       console.log(err);     
    }
   });
   //----------------------- megadum----------------------------------------------

   app.post("/megauma", async (req, res) => {
     const idn1u = req.body.n1u;
     console.log("sorteado " + idn1u);
     try {
       const result = await db.query("SELECT concurso, to_char(n1, '00') as n1, to_char(n2, '00') as n2, to_char(n3, '00') as n3, to_char(n4, '00') as n4, to_char(n5, '00') as n5, to_char(n6, '00') as n6 FROM sena where (n1 = $1) or (n2 = $1) or (n3 = $1) or (n4 = $1) or (n5 = $1) or (n6 = $1)", [idn1u]);
       items = result.rows;  
       
       res.render("megaum.ejs", {
         listTitleuma: "esse numero já foi sorteado... ",
         listItemsuma: items,
         listsearch1: idn1u,        
       });
     } catch (err) {
       console.log(err);     
    }
   });

   //----------------------- megaduas----------------------------------------------

   app.post("/megaduas", async (req, res) => {
    // const item = req.body.updatedItemTitle;
     const idn1d = req.body.n1d;
     const idn2d = req.body.n2d;
     console.log("sorteada " + idn1d);
     try {
       const result = await db.query("SELECT concurso, to_char(n1, '00') as n1, to_char(n2, '00') as n2, to_char(n3, '00') as n3, to_char(n4, '00') as n4, to_char(n5, '00') as n5, to_char(n6, '00') as n6 FROM sena where (n1 = $1 and n2 = $2) or (n2 = $1 and n3 = $2) or (n3 = $1 and n4 = $2) or (n4 = $1 and n5 = $2) or (n5 = $1 and n6 = $2) ", [idn1d, idn2d]);
       items = result.rows;
   
       
       res.render("megaduas.ejs", {
         listTitleduas: "essa combinação de 2 numeros já foi sorteada... ",
         listItemsduas: items,
         listsearch1: idn1d,
         listsearch2: idn2d,
       });
     } catch (err) {
       console.log(err);     
    }
   });

   //----------------------- megatres----------------------------------------------

   app.post("/megatres", async (req, res) => {
    // const item = req.body.updatedItemTitle;
     const idn1t = req.body.n1t;
     const idn2t = req.body.n2t;
     const idn3t = req.body.n3t;
     console.log("sorteada " + idn1t);
     try {
       const result = await db.query("SELECT concurso, to_char(n1, '00') as n1, to_char(n2, '00') as n2, to_char(n3, '00') as n3, to_char(n4, '00') as n4, to_char(n5, '00') as n5, to_char(n6, '00') as n6 FROM sena where (n1 = $1 and n2 = $2 and n3 = $3) or (n2 = $1 and n3 = $2 and n4 = $3) or (n3 = $1 and n4 = $2 and n5 = $3) or (n4 = $1 and n5 = $2 and n6 = $3)", [idn1t, idn2t, idn3t]);
       items = result.rows;
   
       
       res.render("megatres.ejs", {
         listTitletres: "essa combinação de 3 numeros já foi sorteada... ",
         listItemstres: items,
         listsearcht1: idn1t,
         listsearcht2: idn2t,
         listsearcht3: idn3t,

       });
     } catch (err) {
       console.log(err);     
    }
   });
   

    //----------------------- megafour----------------------------------------------

    app.post("/megafour", async (req, res) => {
      // const item = req.body.updatedItemTitle;
       const idn1q = req.body.n1q;
       const idn2q = req.body.n2q;
       const idn3q = req.body.n3q;
       const idn4q = req.body.n4q
       console.log("sorteada " + idn1q);
       try {
         const result = await db.query("SELECT concurso, to_char(n1, '00') as n1, to_char(n2, '00') as n2, to_char(n3, '00') as n3, to_char(n4, '00') as n4, to_char(n5, '00') as n5, to_char(n6, '00') as n6 FROM sena where (n1 = $1 and n2 = $2 and n3 = $3 and n4 = $4) or (n2 = $1 and n3 = $2 and n4 = $3 and n5 = $4) or (n3 = $1 and n4 = $2 and n5 = $3 and n6 = $4)", [idn1q, idn2q, idn3q, idn4q]);
         items = result.rows;
     
         
         res.render("megaquatro.ejs", {
           listTitletres: "essa combinação de 4 numeros já foi sorteada... ",
           listItemsquatro: items,
           listsearchq1: idn1q,
           listsearchq2: idn2q,
           listsearchq3: idn3q,
           listsearchq4: idn4q,
  
         });
       } catch (err) {
         console.log(err);     
      }
     });


     //----------------------- megafive----------------------------------------------

    app.post("/megafive", async (req, res) => {
      // const item = req.body.updatedItemTitle;
       const idn1c = req.body.n1c;
       const idn2c = req.body.n2c;
       const idn3c = req.body.n3c;
       const idn4c = req.body.n4c;
       const idn5c = req.body.n5c;
       console.log("sorteada " + idn1c);
       try {
         const result = await db.query("SELECT concurso, to_char(n1, '00') as n1, to_char(n2, '00') as n2, to_char(n3, '00') as n3, to_char(n4, '00') as n4, to_char(n5, '00') as n5, to_char(n6, '00') as n6 FROM sena where (n1 = $1 and n2 = $2 and n3 = $3 and n4 = $4 and n5 = $5) or (n2 = $1 and n3 = $2 and n4 = $3 and n5 = $4 and n6 = $5)", [idn1c, idn2c, idn3c, idn4c, idn5c]);
         items = result.rows;
     
         
         res.render("megacinco.ejs", {
           listTitlehamesh: "essa combinação de 5 numeros já foi sorteada... ",
           listItemscinco: items,
           listsearchc1: idn1c,
           listsearchc2: idn2c,
           listsearchc3: idn3c,
           listsearchc4: idn4c,
           listsearchc5: idn5c,
         });
       } catch (err) {
         console.log(err);     
      }
     });

     // ---------------------------------------Insert------------------------------
    app.post("/goinsert", async (req, res) => {
      console.log("no post goinsert")
    res.render("inserting.ejs");
    });

     // ---------------------------------------ADD------------------------------
     app.post("/add", async (req, res) => {
      const inputconcurso = req.body["concursoadd"];
      const inputdia = req.body["diaadd"];
      const inputmes = req.body["mesadd"];
      const inputano = req.body["anoadd"];
      const inputn1 = req.body["n1add"];
      const inputn2 = req.body["n2add"];
      const inputn3 = req.body["n3add"];
      const inputn4 = req.body["n4add"];
      const inputn5 = req.body["n5add"];
      const inputn6 = req.body["n6add"];
      
    
      try {
        await db.query(
        "INSERT INTO sena (concurso, dia, mes, ano, n1, n2, n3, n4, n5, n6) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)",
            [inputconcurso, inputdia, inputmes, inputano, inputn1, inputn2, inputn3, inputn4, inputn5, inputn6]
          );
          res.redirect("/");
        } catch (err) {
          console.log(err);
        }
      }
    );

    //-------------------------------EDIT DELETE---------------------------------------------------

    app.post("/editaredeletar", async (req, res) => {
      try {
        const result = await db.query("SELECT * from sena ORDER BY id DESC");
        items = result.rows;
    
        console.log("editar e deletar entrou");

        res.render("editdelete.ejs", {
          listTitle: "Editando e deletando",
          listItems: items,      
        });
      } catch (err) {
        console.log(err);
      }
    });
 //-------------------------------DELETE---------------------------------------------------


    app.post("/delete", async (req, res) => {
      const id = req.body.deleteItemId;
      console.log("deleted id " + id);
      try {
        await db.query("DELETE FROM sena WHERE id = $1", [id]);
        res.redirect("/");
      } catch (err) {
        console.log(err);
      }
    });

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
