package com.luana.email.Consumer;

import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.stereotype.Component;
import org.springframework.beans.BeanUtils;

import com.luana.email.services.EmailService;
import com.luana.email.dtos.EmailRecordDto;
import com.luana.email.entity.EmailEntity;

@Component
public class EmailConsumer {

    final EmailService emailService;

    public EmailConsumer(EmailService emailService) {
        this.emailService = emailService;
    }

    @RabbitListener(queues = "${broker.queue.email.name}")
    public void listenEmailQueue(@Payload EmailRecordDto emailRecordDto) {

        var emailEntity = new EmailEntity();

        BeanUtils.copyProperties(emailRecordDto, emailEntity);

        emailService.sendEmail(emailEntity);
    }
}