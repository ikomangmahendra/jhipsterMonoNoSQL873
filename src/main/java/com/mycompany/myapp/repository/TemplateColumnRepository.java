package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.TemplateColumn;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

/**
 * Spring Data MongoDB repository for the TemplateColumn entity.
 */
@Repository
public interface TemplateColumnRepository extends MongoRepository<TemplateColumn, String> {}
