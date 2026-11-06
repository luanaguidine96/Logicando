package com.luana.mensageria.Producer;

import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import com.luana.mensageria.Dto.EmailDto;
import com.luana.mensageria.Entity.User;

@Component
public class UserProducer {

    final RabbitTemplate rabbitTemplate;

    public UserProducer(RabbitTemplate rabbitTemplate) {
        this.rabbitTemplate = rabbitTemplate;
    }

    @Value(value = "${broker.queue.email.name}")
    private String routingKey;

   public void publishMessageEmail(User user) {
    System.out.println(">>> PUBLICANDO MENSAGEM NO RABBITMQ");
    var emailDto = new EmailDto();

    emailDto.setUserid(user.getUserId());
    emailDto.setEmailTo(user.getEmail());
    emailDto.setSubject("Cadastro realizado com sucesso!");
    emailDto.setText(user.getName() + ", seja bem vindo(a)! \nAgradecemos o seu cadastro, aproveite agora todos os recursos da nossa plataforma Logicando! \n\nAtenciosamente, \nEquipe Logicando.");

    rabbitTemplate.convertAndSend("", routingKey, emailDto);
}

}