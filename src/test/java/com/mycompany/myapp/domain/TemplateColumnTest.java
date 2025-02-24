package com.mycompany.myapp.domain;

import static com.mycompany.myapp.domain.TemplateColumnTestSamples.*;
import static com.mycompany.myapp.domain.TemplatePropertiesTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.mycompany.myapp.web.rest.TestUtil;
import java.util.HashSet;
import java.util.Set;
import org.junit.jupiter.api.Test;

class TemplateColumnTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TemplateColumn.class);
        TemplateColumn templateColumn1 = getTemplateColumnSample1();
        TemplateColumn templateColumn2 = new TemplateColumn();
        assertThat(templateColumn1).isNotEqualTo(templateColumn2);

        templateColumn2.setId(templateColumn1.getId());
        assertThat(templateColumn1).isEqualTo(templateColumn2);

        templateColumn2 = getTemplateColumnSample2();
        assertThat(templateColumn1).isNotEqualTo(templateColumn2);
    }

    @Test
    void propertiesTest() {
        TemplateColumn templateColumn = getTemplateColumnRandomSampleGenerator();
        TemplateProperties templatePropertiesBack = getTemplatePropertiesRandomSampleGenerator();

        templateColumn.addProperties(templatePropertiesBack);
        assertThat(templateColumn.getProperties()).containsOnly(templatePropertiesBack);
        assertThat(templatePropertiesBack.getTemplateColumn()).isEqualTo(templateColumn);

        templateColumn.removeProperties(templatePropertiesBack);
        assertThat(templateColumn.getProperties()).doesNotContain(templatePropertiesBack);
        assertThat(templatePropertiesBack.getTemplateColumn()).isNull();

        templateColumn.properties(new HashSet<>(Set.of(templatePropertiesBack)));
        assertThat(templateColumn.getProperties()).containsOnly(templatePropertiesBack);
        assertThat(templatePropertiesBack.getTemplateColumn()).isEqualTo(templateColumn);

        templateColumn.setProperties(new HashSet<>());
        assertThat(templateColumn.getProperties()).doesNotContain(templatePropertiesBack);
        assertThat(templatePropertiesBack.getTemplateColumn()).isNull();
    }
}
