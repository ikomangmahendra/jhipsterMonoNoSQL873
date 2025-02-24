package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.TemplateColumn;
import com.mycompany.myapp.repository.TemplateColumnRepository;
import com.mycompany.myapp.service.TemplateColumnService;
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
 * REST controller for managing {@link com.mycompany.myapp.domain.TemplateColumn}.
 */
@RestController
@RequestMapping("/api/template-columns")
public class TemplateColumnResource {

    private static final Logger LOG = LoggerFactory.getLogger(TemplateColumnResource.class);

    private static final String ENTITY_NAME = "templateColumn";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final TemplateColumnService templateColumnService;

    private final TemplateColumnRepository templateColumnRepository;

    public TemplateColumnResource(TemplateColumnService templateColumnService, TemplateColumnRepository templateColumnRepository) {
        this.templateColumnService = templateColumnService;
        this.templateColumnRepository = templateColumnRepository;
    }

    /**
     * {@code POST  /template-columns} : Create a new templateColumn.
     *
     * @param templateColumn the templateColumn to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new templateColumn, or with status {@code 400 (Bad Request)} if the templateColumn has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public ResponseEntity<TemplateColumn> createTemplateColumn(@Valid @RequestBody TemplateColumn templateColumn)
        throws URISyntaxException {
        LOG.debug("REST request to save TemplateColumn : {}", templateColumn);
        if (templateColumn.getId() != null) {
            throw new BadRequestAlertException("A new templateColumn cannot already have an ID", ENTITY_NAME, "idexists");
        }
        templateColumn = templateColumnService.save(templateColumn);
        return ResponseEntity.created(new URI("/api/template-columns/" + templateColumn.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, templateColumn.getId()))
            .body(templateColumn);
    }

    /**
     * {@code PUT  /template-columns/:id} : Updates an existing templateColumn.
     *
     * @param id the id of the templateColumn to save.
     * @param templateColumn the templateColumn to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated templateColumn,
     * or with status {@code 400 (Bad Request)} if the templateColumn is not valid,
     * or with status {@code 500 (Internal Server Error)} if the templateColumn couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public ResponseEntity<TemplateColumn> updateTemplateColumn(
        @PathVariable(value = "id", required = false) final String id,
        @Valid @RequestBody TemplateColumn templateColumn
    ) throws URISyntaxException {
        LOG.debug("REST request to update TemplateColumn : {}, {}", id, templateColumn);
        if (templateColumn.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, templateColumn.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!templateColumnRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        templateColumn = templateColumnService.update(templateColumn);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, templateColumn.getId()))
            .body(templateColumn);
    }

    /**
     * {@code PATCH  /template-columns/:id} : Partial updates given fields of an existing templateColumn, field will ignore if it is null
     *
     * @param id the id of the templateColumn to save.
     * @param templateColumn the templateColumn to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated templateColumn,
     * or with status {@code 400 (Bad Request)} if the templateColumn is not valid,
     * or with status {@code 404 (Not Found)} if the templateColumn is not found,
     * or with status {@code 500 (Internal Server Error)} if the templateColumn couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<TemplateColumn> partialUpdateTemplateColumn(
        @PathVariable(value = "id", required = false) final String id,
        @NotNull @RequestBody TemplateColumn templateColumn
    ) throws URISyntaxException {
        LOG.debug("REST request to partial update TemplateColumn partially : {}, {}", id, templateColumn);
        if (templateColumn.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, templateColumn.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!templateColumnRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<TemplateColumn> result = templateColumnService.partialUpdate(templateColumn);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, templateColumn.getId())
        );
    }

    /**
     * {@code GET  /template-columns} : get all the templateColumns.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of templateColumns in body.
     */
    @GetMapping("")
    public List<TemplateColumn> getAllTemplateColumns() {
        LOG.debug("REST request to get all TemplateColumns");
        return templateColumnService.findAll();
    }

    /**
     * {@code GET  /template-columns/:id} : get the "id" templateColumn.
     *
     * @param id the id of the templateColumn to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the templateColumn, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public ResponseEntity<TemplateColumn> getTemplateColumn(@PathVariable("id") String id) {
        LOG.debug("REST request to get TemplateColumn : {}", id);
        Optional<TemplateColumn> templateColumn = templateColumnService.findOne(id);
        return ResponseUtil.wrapOrNotFound(templateColumn);
    }

    /**
     * {@code DELETE  /template-columns/:id} : delete the "id" templateColumn.
     *
     * @param id the id of the templateColumn to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTemplateColumn(@PathVariable("id") String id) {
        LOG.debug("REST request to delete TemplateColumn : {}", id);
        templateColumnService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id)).build();
    }
}
