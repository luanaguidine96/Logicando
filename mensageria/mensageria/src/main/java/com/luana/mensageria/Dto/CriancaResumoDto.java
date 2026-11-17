package com.luana.mensageria.Dto;

import java.util.UUID;

public record CriancaResumoDto(
    UUID userId,
    String name,
    String login
) {}