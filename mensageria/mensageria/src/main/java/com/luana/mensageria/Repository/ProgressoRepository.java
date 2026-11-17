package com.luana.mensageria.Repository;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.luana.mensageria.Entity.Progresso;

public interface ProgressoRepository extends JpaRepository<Progresso, UUID> {

    Optional<Progresso> findByCriancaLogin(String login);

}