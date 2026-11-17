package com.luana.mensageria.Controller;

import java.util.List;

import org.springframework.web.bind.annotation.*;

import com.luana.mensageria.Dto.FaseDto;
import com.luana.mensageria.Service.ProgressoService;

@RestController
@RequestMapping("/progresso")
@CrossOrigin(origins = "http://localhost:4200")
public class ProgressoController {

    private final ProgressoService progressoService;

    public ProgressoController(ProgressoService progressoService) {
        this.progressoService = progressoService;
    }

    @GetMapping("/crianca/{login}")
    public List<FaseDto> buscar(@PathVariable String login) throws Exception {
        return progressoService.buscar(login);
    }

    @PutMapping("/crianca/{login}")
    public List<FaseDto> salvar(
            @PathVariable String login,
            @RequestBody List<FaseDto> fases) throws Exception {
        return progressoService.salvar(login, fases);
    }
}