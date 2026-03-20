package com.hiresmart.util;

import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;
import org.springframework.web.multipart.MultipartFile;

import java.io.InputStream;

public class PdfParser {

    public static String parse(MultipartFile file) {

        try {

            InputStream input = file.getInputStream();
            PDDocument document = PDDocument.load(input);

            PDFTextStripper stripper = new PDFTextStripper();
            String text = stripper.getText(document);

            document.close();

            return text;

        } catch(Exception e){
            throw new RuntimeException(e);
        }
    }
}