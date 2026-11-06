
package com.luana.mensageria.Dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record UserRecordDto(
//dados a ser inseridos
    @NotBlank
    String name,

    @NotBlank
    @Email
    String email,

    @NotBlank
    String login,

    @NotBlank
    String senha,

    @NotBlank
    String loginCrianca,

    @NotBlank
    String senhaCrianca

) {
}
