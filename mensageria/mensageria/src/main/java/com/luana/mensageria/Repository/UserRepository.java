
package com.luana.mensageria.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.luana.mensageria.Entity.User;

public interface UserRepository extends JpaRepository<User, UUID> {

    boolean existsByLogin(String login);

    Optional<User> findByLogin(String login);

    // Busca as crianças vinculadas a um responsável
    List<User> findByResponsavelUserId(UUID responsavelId);
}
