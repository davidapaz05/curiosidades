package br.edu.senaisp.curiosities.repository;

import br.edu.senaisp.curiosities.model.Curiosidade;
import br.edu.senaisp.curiosities.model.Categoria;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface CuriosidadeRepository extends MongoRepository<Curiosidade, String> {
    List<Curiosidade> findByCategoria(Categoria categoria);
}
