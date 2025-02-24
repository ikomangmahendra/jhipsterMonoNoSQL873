package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.TemplateProperties;
import com.mycompany.myapp.repository.TemplatePropertiesRepository;
import com.mycompany.myapp.service.TemplatePropertiesService;
import com.mycompany.myapp.web.rest.errors.BadRequestAlertException;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link com.mycompany.myapp.domain.TemplateProperties}.
 */
@RestController
@RequestMapping("/api/template-properties")
public class TemplatePropertiesResource {

    private static final Logger LOG = LoggerFactory.getLogger(TemplatePropertiesResource.class);

    private static final String ENTITY_NAME = "templateProperties";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final TemplatePropertiesService templatePropertiesService;

    private final TemplatePropertiesRepository templatePropertiesRepository;

    public TemplatePropertiesResource(
        TemplatePropertiesService templatePropertiesService,
        TemplatePropertiesRepository templatePropertiesRepository
    ) {
        this.templatePropertiesService = templatePropertiesService;
        this.templatePropertiesRepository = templatePropertiesRepository;
    }

    /**
     * {@code POST  /template-properties} : Create a new templateProperties.
     *
     * @param templateProperties the templateProperties to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new templateProperties, or with status {@code 400 (Bad Request)} if the templateProperties has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public ResponseEntity<TemplateProperties> createTemplateProperties(@Valid @RequestBody TemplateProperties templateProperties)
        throws URISyntaxException {
        LOG.debug("REST request to save TemplateProperties : {}", templateProperties);
        if (templateProperties.getId() != null) {
            throw new BadRequestAlertException("A new templateProperties cannot already have an ID", ENTITY_NAME, "idexists");
        }
        templateProperties = templatePropertiesService.save(templateProperties);
        return ResponseEntity.created(new URI("/api/template-properties/" + templateProperties.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, templateProperties.getId()))
            .body(templateProperties);
    }

    /**
     * {@code PUT  /template-properties/:id} : Updates an existing templateProperties.
     *
     * @param id the id of the templateProperties to save.
     * @param templateProperties the templateProperties to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated templateProperties,
     * or with status {@code 400 (Bad Request)} if the templateProperties is not valid,
     * or with status {@code 500 (Internal Server Error)} if the templateProperties couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public ResponseEntity<TemplateProperties> updateTemplateProperties(
        @PathVariable(value = "id", required = false) final String id,
        @Valid @RequestBody TemplateProperties templateProperties
    ) throws URISyntaxException {
        LOG.debug("REST request to update TemplateProperties : {}, {}", id, templateProperties);
        if (templateProperties.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, templateProperties.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!templatePropertiesRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        templateProperties = templatePropertiesService.update(templateProperties);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, templateProperties.getId()))
            .body(templateProperties);
    }

    /**
     * {@code PATCH  /template-properties/:id} : Partial updates given fields of an existing templateProperties, field will ignore if it is null
     *
     * @param id the id of the templateProperties to save.
     * @param templateProperties the templateProperties to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated templateProperties,
     * or with status {@code 400 (Bad Request)} if the templateProperties is not valid,
     * or with status {@code 404 (Not Found)} if the templateProperties is not found,
     * or with status {@code 500 (Internal Server Error)} if the templateProperties couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<TemplateProperties> partialUpdateTemplateProperties(
        @PathVariable(value = "id", required = false) final String id,
        @NotNull @RequestBody TemplateProperties templateProperties
    ) throws URISyntaxException {
        LOG.debug("REST request to partial update TemplateProperties partially : {}, {}", id, templateProperties);
        if (templateProperties.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, templateProperties.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!templatePropertiesRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<TemplateProperties> result = templatePropertiesService.partialUpdate(templateProperties);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, templateProperties.getId())
        );
    }

    /**
     * {@code GET  /template-properties} : get all the templateProperties.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of templateProperties in body.
     */
    @GetMapping("")
    public List<TemplateProperties> getAllTemplateProperties() {
        LOG.debug("REST request to get all TemplateProperties");
        return templatePropertiesService.findAll();
    }

    /**
     * {@code GET  /template-properties/:id} : get the "id" templateProperties.
     *
     * @param id the id of the templateProperties to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the templateProperties, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public ResponseEntity<TemplateProperties> getTemplateProperties(@PathVariable("id") String id) {
        LOG.debug("REST request to get TemplateProperties : {}", id);
        Optional<TemplateProperties> templateProperties = templatePropertiesService.findOne(id);
        return ResponseUtil.wrapOrNotFound(templateProperties);
    }

    /**
     * {@code DELETE  /template-properties/:id} : delete the "id" templateProperties.
     *
     * @param id the id of the templateProperties to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTemplateProperties(@PathVariable("id") String id) {
        LOG.debug("REST request to delete TemplateProperties : {}", id);
        templatePropertiesService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id)).build();
    }
}
