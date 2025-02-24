package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

/**
 * A TemplateColumn.
 */
@Document(collection = "template_column")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class TemplateColumn implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @NotNull
    @Field("template_name")
    private String templateName;

    @DBRef
    @Field("properties")
    @JsonIgnoreProperties(value = { "templateColumn" }, allowSetters = true)
    private Set<TemplateProperties> properties = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public String getId() {
        return this.id;
    }

    public TemplateColumn id(String id) {
        this.setId(id);
        return this;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTemplateName() {
        return this.templateName;
    }

    public TemplateColumn templateName(String templateName) {
        this.setTemplateName(templateName);
        return this;
    }

    public void setTemplateName(String templateName) {
        this.templateName = templateName;
    }

    public Set<TemplateProperties> getProperties() {
        return this.properties;
    }

    public void setProperties(Set<TemplateProperties> templateProperties) {
        if (this.properties != null) {
            this.properties.forEach(i -> i.setTemplateColumn(null));
        }
        if (templateProperties != null) {
            templateProperties.forEach(i -> i.setTemplateColumn(this));
        }
        this.properties = templateProperties;
    }

    public TemplateColumn properties(Set<TemplateProperties> templateProperties) {
        this.setProperties(templateProperties);
        return this;
    }

    public TemplateColumn addProperties(TemplateProperties templateProperties) {
        this.properties.add(templateProperties);
        templateProperties.setTemplateColumn(this);
        return this;
    }

    public TemplateColumn removeProperties(TemplateProperties templateProperties) {
        this.properties.remove(templateProperties);
        templateProperties.setTemplateColumn(null);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof TemplateColumn)) {
            return false;
        }
        return getId() != null && getId().equals(((TemplateColumn) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "TemplateColumn{" +
            "id=" + getId() +
            ", templateName='" + getTemplateName() + "'" +
            "}";
    }
}
