package com.mmtrios.springbootlibrary.controller;

import com.mmtrios.springbootlibrary.entity.Message;
import com.mmtrios.springbootlibrary.requestmodels.AdminQuestionRequest;
import com.mmtrios.springbootlibrary.service.MessageService;
import com.mmtrios.springbootlibrary.utils.ExtractJWT;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("/api/messages")
public class MessageController {
    private MessageService messageService;

    @Autowired
    public MessageController(MessageService messageService){
        this.messageService = messageService;
    }

    @PostMapping("/secure/add/message")
    public void postMessage(@RequestHeader(value="Authorization") String token, @RequestBody Message messageRequest){
        String userEmail = ExtractJWT.payloadJWTExtraction(token, "\"sub\"");

        messageService.postMessage(messageRequest, userEmail);
    }

    @PutMapping("/secure/admin/message")
    public void putMessage(@RequestHeader(value="Authorization") String token, @RequestBody
            AdminQuestionRequest adminQuestionRequest) throws Exception{
        String userEmail = ExtractJWT.payloadJWTExtraction(token, "\"sub\"");
        String admin = ExtractJWT.payloadJWTExtraction(token, "\"userType\"");

        if(admin == null || !admin.equals("admin")){
            throw new Exception("Administration page only");
        }
        messageService.putMessage(adminQuestionRequest, userEmail);
    }
}
