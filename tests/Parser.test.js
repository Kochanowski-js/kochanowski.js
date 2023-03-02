import { parseExpression } from "../models/Parser";

describe('parseExpression', () => {

    it('Parse basic variables', () => {

        expect(parseExpression("def var varname foo varvalue 5;").mem)
            .toStrictEqual({functions: {}, variables: { foo: { type: "LITERAL", value: 5 }}});

        expect(parseExpression("def var varname foo varvalue 5;  def var varname bar varvalue \"hello world\";").mem)
            .toStrictEqual({functions: {}, variables: { foo: { type: "LITERAL", value: 5 }, bar: { type: "STRING", value: "hello world" } }});

    });

    it('Parse basic variables when the value is another variable', () => {

        expect(parseExpression("def var varname foo varvalue 5; def var varname bar varvalue foo;").mem)
            .toStrictEqual({functions: {}, variables: { foo: { type: "LITERAL", value: 5 }, bar: { type: "LITERAL", value: 5 }}});


    });

    it('Parse basic mathematical expressions', () => {

        expect(parseExpression("def var varname moth varvalue 2 add 5;").mem)
            .toStrictEqual({functions: {}, variables: { moth: { type: "LITERAL", value: 7 }}});

        expect(parseExpression("def var varname moth varvalue 2 mul 2 add 2;").mem)
            .toStrictEqual({functions: {}, variables: { moth: { type: "LITERAL", value: 6 }}});

        expect(parseExpression("def var varname moth varvalue 2 add 2 mul 2;").mem)
            .toStrictEqual({functions: {}, variables: { moth: { type: "LITERAL", value: 6 }}});

    });

});