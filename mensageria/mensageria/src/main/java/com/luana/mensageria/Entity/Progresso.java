package com.luana.mensageria.Entity;

import java.util.UUID;

import jakarta.persistence.*;

@Entity
@Table(name = "progresso")
public class Progresso {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @OneToOne
    @JoinColumn(name = "crianca_id", nullable = false, unique = true)
    private User crianca;

    @Column(columnDefinition = "TEXT")
    private String fases;

    public UUID getId() {
        return id;
    }

    public User getCrianca() {
        return crianca;
    }

    public void setCrianca(User crianca) {
        this.crianca = crianca;
    }

    public String getFases() {
        return fases;
    }

    public void setFases(String fases) {
        this.fases = fases;
    }
}