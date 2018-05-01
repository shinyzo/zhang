package com.lming.zhang.upms.server.config;

import com.jagregory.shiro.freemarker.ShiroTags;
import freemarker.template.TemplateException;
import freemarker.template.TemplateModelException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.view.freemarker.FreeMarkerConfigurer;

import javax.annotation.PostConstruct;
import java.io.IOException;

/**
 * freemarker shiro tag
 */
@Component
public class ShiroTagFreemarkerConfigurer {

    @Autowired
    private FreeMarkerConfigurer freeMarkerConfigurer;

    @PostConstruct
    public void setSharedVariable() throws TemplateModelException {

        freeMarkerConfigurer.getConfiguration().setSharedVariable("shiro", new ShiroTags());
    }
}
