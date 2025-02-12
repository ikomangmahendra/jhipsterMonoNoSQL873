package com.mycompany.myapp.domain;

import java.util.UUID;

public class TemplateColumnTestSamples {

    public static TemplateColumn getTemplateColumnSample1() {
        return new TemplateColumn().id("id1").templateName("templateName1");
    }

    public static TemplateColumn getTemplateColumnSample2() {
        return new TemplateColumn().id("id2").templateName("templateName2");
    }

    public static TemplateColumn getTemplateColumnRandomSampleGenerator() {
        return new TemplateColumn().id(UUID.randomUUID().toString()).templateName(UUID.randomUUID().toString());
    }
}
