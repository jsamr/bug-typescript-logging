import { expect } from 'chai'
import 'mocha'
import { existsSync, unlinkSync } from 'fs'
import { Category, CategoryLogFormat, CategoryServiceFactory, CategoryConfiguration, LogLevel, LoggerType } from "typescript-logging"
import { createCustomLogger } from "./CustomLogger"


describe('Category instance, after CategoryServiceFactory.setConfigurationCategory with applyChildren true has been called upon', () => {
    it('should write to integrity.log file', () => {
        const integrityConf = new CategoryConfiguration(LogLevel.Debug, LoggerType.Custom, new CategoryLogFormat(), createCustomLogger)
        const intLog = new Category('integrity1')        
        CategoryServiceFactory.setConfigurationCategory(integrityConf, intLog, true)
        intLog.warn('This shall be written on integrity.log file')
        expect(existsSync('integrity.log')).to.true
    })
    after(() => {
        if (existsSync('integrity.log')) unlinkSync('integrity.log')
    })
})

describe('Category instance, after CategoryServiceFactory.setConfigurationCategory with applyChildren false has been called upon', () => {
    it('should write to integrity.log file', () => {
        const integrityConf = new CategoryConfiguration(LogLevel.Debug, LoggerType.Custom, new CategoryLogFormat(), createCustomLogger)
        const intLog = new Category('integrity2')        
        CategoryServiceFactory.setConfigurationCategory(integrityConf, intLog, false)
        intLog.warn('This shall be written on integrity.log file')
        expect(existsSync('integrity.log')).to.true
    })
    after(() => {
        if (existsSync('integrity.log')) unlinkSync('integrity.log')
    })
})

describe('Category instance, after CategoryServiceFactory.setDefaultConfiguration has been called upon', () => {
    it('should write to integrity.log file', () => {
        const integrityConf = new CategoryConfiguration(LogLevel.Debug, LoggerType.Custom, new CategoryLogFormat(), createCustomLogger)
        const intLog = new Category('integrity3')        
        CategoryServiceFactory.setDefaultConfiguration(integrityConf)
        intLog.warn('This shall be written on integrity.log file')
        expect(existsSync('integrity.log')).to.true
    })
    after(() => {
        if (existsSync('integrity.log')) unlinkSync('integrity.log')
    })
})