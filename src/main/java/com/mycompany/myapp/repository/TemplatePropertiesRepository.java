package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.TemplateProperties;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

/**
 * Spring Data MongoDB repository for the TemplateProperties entity.
 */
@Repository
public interface TemplatePropertiesRepository extends MongoRepository<TemplateProperties, String> {}
