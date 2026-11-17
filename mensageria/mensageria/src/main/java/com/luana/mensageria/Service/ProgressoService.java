package com.luana.mensageria.Service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import com.luana.mensageria.Dto.FaseDto;
import com.luana.mensageria.Entity.Progresso;
import com.luana.mensageria.Entity.User;
import com.luana.mensageria.Entity.UserRole;
import com.luana.mensageria.Repository.ProgressoRepository;
import com.luana.mensageria.Repository.UserRepository;

@Service
public class ProgressoService {

    private final ProgressoRepository progressoRepository;
    private final UserRepository userRepository;
    private final ObjectMapper objectMapper;

    public ProgressoService(
            ProgressoRepository progressoRepository,
            UserRepository userRepository,
            ObjectMapper objectMapper) {
        this.progressoRepository = progressoRepository;
        this.userRepository = userRepository;
        this.objectMapper = objectMapper;
    }

    public List<FaseDto> buscar(String login) throws Exception {

        User crianca = userRepository.findByLogin(login)
                .orElseThrow(() -> new RuntimeException("Criança não encontrada!"));

        if (crianca.getRole() != UserRole.CRIANCA) {
            throw new RuntimeException("Usuário não é uma criança!");
        }

        Progresso progresso = progressoRepository.findByCriancaLogin(login)
                .orElseGet(() -> criarProgresso(crianca));

        return objectMapper.readValue(
                progresso.getFases(),
                new TypeReference<List<FaseDto>>() {}
        );
    }

    @Transactional
    public List<FaseDto> salvar(String login, List<FaseDto> fases) throws Exception {

        User crianca = userRepository.findByLogin(login)
                .orElseThrow(() -> new RuntimeException("Criança não encontrada!"));

        if (crianca.getRole() != UserRole.CRIANCA) {
            throw new RuntimeException("Usuário não é uma criança!");
        }

        Progresso progresso = progressoRepository.findByCriancaLogin(login)
                .orElseGet(() -> criarProgresso(crianca));

        progresso.setFases(objectMapper.writeValueAsString(fases));
        progressoRepository.save(progresso);

        return fases;
    }

    private Progresso criarProgresso(User crianca) {

        Progresso progresso = new Progresso();
        progresso.setCrianca(crianca);
        progresso.setFases(padrao());

        return progressoRepository.save(progresso);
    }

    private String padrao() {
        try {
            List<FaseDto> fases = java.util.stream.IntStream.rangeClosed(1, 12)
                    .mapToObj(i -> new FaseDto(
                            i,
                            i == 1 ? "liberada" : "bloqueada"
                    ))
                    .toList();

            return objectMapper.writeValueAsString(fases);

        } catch (Exception e) {
            throw new RuntimeException("Erro ao criar progresso inicial!", e);
        }
    }
}