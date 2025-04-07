import { describe, expect, it } from "vitest"
import Axios from "./axios"

describe('axios class', () => { 
    it('should be defined', () => {
        expect(Axios).toBeDefined()
    })
    it('should have get method', () => {
        expect(Axios.get).toBeDefined()
    })
    it('should have post method', () => {
        expect(Axios.post).toBeDefined()
    })
    it('should have put method', () => {
        expect(Axios.put).toBeDefined()
    })
    it('should have delete method', () => {
        expect(Axios.delete).toBeDefined()
    })
 })