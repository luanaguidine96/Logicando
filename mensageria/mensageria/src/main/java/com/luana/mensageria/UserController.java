
package com.luana.mensageria;

import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.luana.mensageria.Dto.UserRecordDto;
import com.luana.mensageria.Entity.User;
import com.luana.mensageria.Service.UserService;

import jakarta.validation.Valid;

@CrossOrigin(origins = "http://127.0.0.1:5500")
@RestController
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    // Lista os usuários cadastrados
    @GetMapping("/user")
    public ResponseEntity<?> listarUsuarios() {
        return ResponseEntity.ok(userService.listarUsuarios());
    }

    // Cadastra o responsável e a criança
    @PostMapping("/user")
    public ResponseEntity<?> saveUser(
            @RequestBody @Valid UserRecordDto userRecordDto) {

        try {
            User responsavel = userService.cadastrarFamilia(userRecordDto);

            return ResponseEntity.status(HttpStatus.CREATED).body(
                Map.of(
                    "mensagem", "Responsável e criança cadastrados com sucesso!",
                    "userId", responsavel.getUserId()
                )
            );

        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(
                Map.of("mensagem", e.getMessage())
            );
        }
    }

    // Realiza o login do responsável ou da criança
    @PostMapping("/login")
    public ResponseEntity<?> login(
            @RequestBody Map<String, String> dados) {

        String login = dados.get("login");
        String senha = dados.get("senha");
        String tipo = dados.get("tipo");

        if (login == null || login.isBlank()
                || senha == null || senha.isBlank()
                || tipo == null || tipo.isBlank()) {

            return ResponseEntity.badRequest().body(
                Map.of("mensagem", "Preencha todos os campos!")
            );
        }

        if (!tipo.equalsIgnoreCase("RESPONSAVEL")
                && !tipo.equalsIgnoreCase("CRIANCA")) {

            return ResponseEntity.badRequest().body(
                Map.of("mensagem", "Tipo de conta inválido!")
            );
        }

        try {
            User usuario = userService.autenticar(login, senha);

            if (!usuario.getRole().name().equalsIgnoreCase(tipo)) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body(
                    Map.of(
                        "mensagem",
                        "Essa conta não corresponde a este tipo de login!"
                    )
                );
            }

            return ResponseEntity.ok(
                Map.of(
                    "mensagem", "Login realizado com sucesso!",
                    "tipo", usuario.getRole().name()
                )
            );

        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(
                Map.of("mensagem", "Login ou senha inválidos!")
            );
        }
    }
}
