
import {patchDocument, Packer, Paragraph, TextRun, PatchType} from "docx";
// Builtin file system utilities
import fs from "fs";
import  path from "path";
import dbConnect from "@/lib/dbConnect";
import userDB from "@/models/userDB";







export default async (req, res) => {


    await dbConnect();


  const  user=await userDB.findOne({code: req.query.code});


  // res.status(200).json(user);
  // return;
    const today = new Date();

    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();

    const formattedDate = `${day}/${month}/${year}`;


    const inputBuffer = fs.readFileSync("/var/www/html/public/AGENT AGREEMENtXY.docx",
        "binary"
    );


    const doc = await patchDocument({outputType: "nodebuffer", data: inputBuffer,


        patches:{
            name:{
                type: PatchType.PARAGRAPH,
                children:[new TextRun(user.name)]
            },
            date:{
                type: PatchType.PARAGRAPH,
                children:[new TextRun(formattedDate)]
            } ,
            father_name:{
                type: PatchType.PARAGRAPH,
                children:[new TextRun(user.fatherName	)]
            },
            address:{
                type: PatchType.PARAGRAPH,
                children:[new TextRun(Object.values(user.presentAddress).join(", ")	)]
            },
            sex:{
                type: PatchType.PARAGRAPH,
                children:[new TextRun("male")]
            }
        },
        keepOriginalStyles:true

    });

    //
    // replaceTextInParagraphs(doc.paragraphs, oldSentence, newSentence);

    res.setHeader('Content-Disposition', `attachment; filename="Agent Agreement.docx"`);

    res.status(200).send(doc);
}
// Write the Node.js Buffer to a file


// fs.writeFileSync(path.resolve(__dirname, "output.docx"), buf);


// Instead of writing it to a file, you could also
// let the user download it, store it in a database,
// on AWS S3, ...
