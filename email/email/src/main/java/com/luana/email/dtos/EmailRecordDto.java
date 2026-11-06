package com.luana.email.dtos;

import java.util.UUID;
import com.fasterxml.jackson.annotation.JsonProperty;

public record EmailRecordDto(

    @JsonProperty("userid")
    UUID userId,

    String emailTo,
    String subject,
    String text

) {
}