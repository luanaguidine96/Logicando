
package com.luana.mensageria.Service;

import java.util.List;

import org.mindrot.jbcrypt.BCrypt;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.luana.mensageria.Dto.UserRecordDto;
import com.luana.mensageria.Entity.User;
import com.luana.mensageria.Entity.UserRole;
import com.luana.mensageria.Producer.UserProducer;
import com.luana.mensageria.Repository.UserRepository;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final UserProducer userProducer;

    public UserService(
            UserRepository userRepository,
            UserProducer userProducer) {

        this.userRepository = userRepository;
        this.userProducer = userProducer;
    }

    @Transactional
    public User cadastrarFamilia(UserRecordDto dados) {

        // Verifica se o login do responsável já existe
        if (userRepository.existsByLogin(dados.login())) {
            throw new RuntimeException(
                "Login do responsável já cadastrado!"
            );
        }

        // Verifica se o login da criança já existe
        if (userRepository.existsByLogin(dados.loginCrianca())) {
            throw new RuntimeException(
                "Login da criança já cadastrado!"
            );
        }

        // Cria o responsável
        User responsavel = new User();

        responsavel.setName(dados.name());
        responsavel.setEmail(dados.email());
        responsavel.setLogin(dados.login());
        responsavel.setSenha(
            BCrypt.hashpw(dados.senha(), BCrypt.gensalt())
        );
        responsavel.setRole(UserRole.RESPONSAVEL);

        User responsavelSalvo = userRepository.save(responsavel);

        // Cria a criança
        User crianca = new User();

        crianca.setName(dados.loginCrianca());
        crianca.setLogin(dados.loginCrianca());
        crianca.setSenha(
            BCrypt.hashpw(dados.senhaCrianca(), BCrypt.gensalt())
        );
        crianca.setRole(UserRole.CRIANCA);
        crianca.setResponsavel(responsavelSalvo);

        userRepository.save(crianca);

        // Envia o e-mail do responsável
        userProducer.publishMessageEmail(responsavelSalvo);

        return responsavelSalvo;
    }

    @Transactional
    public User save(User user) {

        // Protege a senha antes de salvar
        user.setSenha(
            BCrypt.hashpw(user.getSenha(), BCrypt.gensalt())
        );

        User usuarioSalvo = userRepository.save(user);

        // Envia o e-mail do usuário
        userProducer.publishMessageEmail(usuarioSalvo);

        return usuarioSalvo;
    }


public User autenticar(String login, String senha) {

    User usuario = userRepository.findByLogin(login)
        .orElseThrow(() ->
            new RuntimeException("Login ou senha inválidos!")
        );

    if (!BCrypt.checkpw(senha, usuario.getSenha())) {
        throw new RuntimeException("Login ou senha inválidos!");
    }

    return usuario;
}




    public List<User> listarUsuarios() {
        return userRepository.findAll();
    }
}
