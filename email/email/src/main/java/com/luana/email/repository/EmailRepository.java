package com.luana.email.repository;
import com.luana.email.entity.EmailEntity;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmailRepository extends JpaRepository<EmailEntity, UUID> {

}