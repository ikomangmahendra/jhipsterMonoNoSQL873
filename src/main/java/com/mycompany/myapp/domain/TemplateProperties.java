package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.validation.constraints.*;
import java.io.Serializable;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

/**
 * A TemplateProperties.
 */
@Document(collection = "template_properties")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class TemplateProperties implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @NotNull
    @Field("label")
    private String label;

    @DBRef
    @Field("templateColumn")
    @JsonIgnoreProperties(value = { "properties" }, allowSetters = true)
    private TemplateColumn templateColumn;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public String getId() {
        return this.id;
    }

    public TemplateProperties id(String id) {
        this.setId(id);
        return this;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getLabel() {
        return this.label;
    }

    public TemplateProperties label(String label) {
        this.setLabel(label);
        return this;
    }

    public void setLabel(String label) {
        this.label = label;
    }

    public TemplateColumn getTemplateColumn() {
        return this.templateColumn;
    }

    public void setTemplateColumn(TemplateColumn templateColumn) {
        this.templateColumn = templateColumn;
    }

    public TemplateProperties templateColumn(TemplateColumn templateColumn) {
        this.setTemplateColumn(templateColumn);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof TemplateProperties)) {
            return false;
        }
        return getId() != null && getId().equals(((TemplateProperties) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "TemplateProperties{" +
            "id=" + getId() +
            ", label='" + getLabel() + "'" +
            "}";
    }
}
