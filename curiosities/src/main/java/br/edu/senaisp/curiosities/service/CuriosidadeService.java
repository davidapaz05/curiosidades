package br.edu.senaisp.curiosities.service;

import br.edu.senaisp.curiosities.model.Curiosidade;
import br.edu.senaisp.curiosities.repository.CuriosidadeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CuriosidadeService {

    private final CuriosidadeRepository repository;

    public Curiosidade salvar(Curiosidade curiosidade) {
        return repository.save(curiosidade);
    }

    public List<Curiosidade> listarTodos() {
        return repository.findAll();
    }

    public Curiosidade atualizar(String id, Curiosidade novaCuriosidade) {
        return repository.findById(id).map(curiosidade -> {
            curiosidade.setTexto(novaCuriosidade.getTexto());
            curiosidade.setCategoria(novaCuriosidade.getCategoria());
            return repository.save(curiosidade);
        }).orElse(null);
    }

    public void deletar(String id) {
        repository.deleteById(id);
    }
}
