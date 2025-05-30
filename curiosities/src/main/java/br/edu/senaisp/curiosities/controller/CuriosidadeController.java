package br.edu.senaisp.curiosities.controller;

import br.edu.senaisp.curiosities.model.Curiosidade;
import br.edu.senaisp.curiosities.model.Categoria;
import br.edu.senaisp.curiosities.repository.CuriosidadeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/curiosidades")
@RequiredArgsConstructor
public class CuriosidadeController {

    private final CuriosidadeRepository repository;

    @PostMapping
    public Curiosidade criar(@RequestBody Curiosidade curiosidade) {
        return repository.save(curiosidade);
    }

    @GetMapping
    public List<Curiosidade> listar() {
        return repository.findAll();
    }

    @GetMapping("/categoria/{categoria}")
    public List<Curiosidade> listarPorCategoria(@PathVariable Categoria categoria) {
        return repository.findByCategoria(categoria);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Curiosidade> atualizar(@PathVariable String id, @RequestBody Curiosidade nova) {
        return repository.findById(id)
                .map(c -> {
                    c.setTexto(nova.getTexto());
                    c.setCategoria(nova.getCategoria());
                    return ResponseEntity.ok(repository.save(c));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable String id) {
        repository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
