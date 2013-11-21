var helpers = require('./helpers'),
    should = require('should')

var target = 'Query',
    request = helpers.request,
    opts = helpers.opts.bind(null, target),
    assertType = helpers.assertType.bind(null, target),
    assertValidation = helpers.assertValidation.bind(null, target)

describe('query', function() {

  describe('serializations', function() {

    it('should return SerializationException when TableName is not a string', function(done) {
      assertType('TableName', 'String', done)
    })

    it('should return SerializationException when ExclusiveStartKey is not a map', function(done) {
      assertType('ExclusiveStartKey', 'Map', done)
    })

    it('should return SerializationException when ExclusiveStartKey.Attr is not a struct', function(done) {
      assertType('ExclusiveStartKey.Attr', 'Structure', done)
    })

    it('should return SerializationException when ExclusiveStartKey.Attr.S is not a string', function(done) {
      assertType('ExclusiveStartKey.Attr.S', 'String', done)
    })

    it('should return SerializationException when ExclusiveStartKey.Attr.B is not a blob', function(done) {
      assertType('ExclusiveStartKey.Attr.B', 'Blob', done)
    })

    it('should return SerializationException when ExclusiveStartKey.Attr.N is not a string', function(done) {
      assertType('ExclusiveStartKey.Attr.N', 'String', done)
    })

    it('should return SerializationException when AttributesToGet is not a list', function(done) {
      assertType('AttributesToGet', 'List', done)
    })

    it('should return SerializationException when ConsistentRead is not a boolean', function(done) {
      assertType('ConsistentRead', 'Boolean', done)
    })

    it('should return SerializationException when ReturnConsumedCapacity is not a string', function(done) {
      assertType('ReturnConsumedCapacity', 'String', done)
    })

    it('should return SerializationException when IndexName is not a string', function(done) {
      assertType('IndexName', 'String', done)
    })

    it('should return SerializationException when ScanIndexForward is not a boolean', function(done) {
      assertType('ScanIndexForward', 'Boolean', done)
    })

    it('should return SerializationException when Select is not a string', function(done) {
      assertType('Select', 'String', done)
    })

    it('should return SerializationException when Limit is not an integer', function(done) {
      assertType('Limit', 'Integer', done)
    })

    it('should return SerializationException when KeyConditions is not a map', function(done) {
      assertType('KeyConditions', 'Map', done)
    })

    it('should return SerializationException when KeyConditions.Attr is not a struct', function(done) {
      assertType('KeyConditions.Attr', 'Structure', done)
    })

    it('should return SerializationException when KeyConditions.Attr.ComparisonOperator is not a string', function(done) {
      assertType('KeyConditions.Attr.ComparisonOperator', 'String', done)
    })

    it('should return SerializationException when KeyConditions.Attr.AttributeValueList is not a list', function(done) {
      assertType('KeyConditions.Attr.AttributeValueList', 'List', done)
    })

    it('should return SerializationException when KeyConditions.Attr.AttributeValueList.0 is not a struct', function(done) {
      assertType('KeyConditions.Attr.AttributeValueList.0', 'Structure', done)
    })

    it('should return SerializationException when KeyConditions.Attr.AttributeValueList.0.S is not a string', function(done) {
      assertType('KeyConditions.Attr.AttributeValueList.0.S', 'String', done)
    })

    it('should return SerializationException when KeyConditions.Attr.AttributeValueList.0.B is not a blob', function(done) {
      assertType('KeyConditions.Attr.AttributeValueList.0.B', 'Blob', done)
    })

    it('should return SerializationException when KeyConditions.Attr.AttributeValueList.0.N is not a string', function(done) {
      assertType('KeyConditions.Attr.AttributeValueList.0.N', 'String', done)
    })

    it('should return SerializationException when KeyConditions.Attr.AttributeValueList.0.SS is not a list', function(done) {
      assertType('KeyConditions.Attr.AttributeValueList.0.SS', 'List', done)
    })

    it('should return SerializationException when KeyConditions.Attr.AttributeValueList.0.SS.0 is not a string', function(done) {
      assertType('KeyConditions.Attr.AttributeValueList.0.SS.0', 'String', done)
    })

    it('should return SerializationException when KeyConditions.Attr.AttributeValueList.0.NS is not a list', function(done) {
      assertType('KeyConditions.Attr.AttributeValueList.0.NS', 'List', done)
    })

    it('should return SerializationException when KeyConditions.Attr.AttributeValueList.0.NS.0 is not a string', function(done) {
      assertType('KeyConditions.Attr.AttributeValueList.0.NS.0', 'String', done)
    })

    it('should return SerializationException when KeyConditions.Attr.AttributeValueList.0.BS is not a list', function(done) {
      assertType('KeyConditions.Attr.AttributeValueList.0.BS', 'List', done)
    })

    it('should return SerializationException when KeyConditions.Attr.AttributeValueList.0.BS.0 is not a blob', function(done) {
      assertType('KeyConditions.Attr.AttributeValueList.0.BS.0', 'Blob', done)
    })

  })

  describe('validations', function() {

    it('should return ValidationException for no TableName', function(done) {
      assertValidation({},
        '1 validation error detected: ' +
        'Value null at \'tableName\' failed to satisfy constraint: ' +
        'Member must not be null', done)
    })

    it('should return ValidationException for empty TableName', function(done) {
      assertValidation({TableName: ''},
        '2 validation errors detected: ' +
        'Value \'\' at \'tableName\' failed to satisfy constraint: ' +
        'Member must satisfy regular expression pattern: [a-zA-Z0-9_.-]+; ' +
        'Value \'\' at \'tableName\' failed to satisfy constraint: ' +
        'Member must have length greater than or equal to 3', done)
    })

    it('should return ValidationException for short TableName', function(done) {
      assertValidation({TableName: 'a;'},
        '2 validation errors detected: ' +
        'Value \'a;\' at \'tableName\' failed to satisfy constraint: ' +
        'Member must satisfy regular expression pattern: [a-zA-Z0-9_.-]+; ' +
        'Value \'a;\' at \'tableName\' failed to satisfy constraint: ' +
        'Member must have length greater than or equal to 3', done)
    })

    it('should return ValidationException for long TableName', function(done) {
      var name = new Array(256 + 1).join('a')
      assertValidation({TableName: name},
        '1 validation error detected: ' +
        'Value \'' + name + '\' at \'tableName\' failed to satisfy constraint: ' +
        'Member must have length less than or equal to 255', done)
    })

    it('should return ValidationException for empty IndexName', function(done) {
      assertValidation({TableName: 'abc', IndexName: ''},
        '2 validation errors detected: ' +
        'Value \'\' at \'indexName\' failed to satisfy constraint: ' +
        'Member must satisfy regular expression pattern: [a-zA-Z0-9_.-]+; ' +
        'Value \'\' at \'indexName\' failed to satisfy constraint: ' +
        'Member must have length greater than or equal to 3', done)
    })

    it('should return ValidationException for short IndexName', function(done) {
      assertValidation({TableName: 'abc', IndexName: 'a;'},
        '2 validation errors detected: ' +
        'Value \'a;\' at \'indexName\' failed to satisfy constraint: ' +
        'Member must satisfy regular expression pattern: [a-zA-Z0-9_.-]+; ' +
        'Value \'a;\' at \'indexName\' failed to satisfy constraint: ' +
        'Member must have length greater than or equal to 3', done)
    })

    it('should return ValidationException for long IndexName', function(done) {
      var name = '', i
      for (i = 0; i < 256; i++) name += 'a'
      assertValidation({TableName: 'abc', IndexName: name},
        '1 validation error detected: ' +
        'Value \'' + name + '\' at \'indexName\' failed to satisfy constraint: ' +
        'Member must have length less than or equal to 255', done)
    })

    it('should return ValidationException for incorrect attributes', function(done) {
      assertValidation({TableName: 'abc;', ReturnConsumedCapacity: 'hi', AttributesToGet: [],
        IndexName: 'abc;', Select: 'hi', Limit: -1, KeyConditions: {a: {}, b: {ComparisonOperator: ''}}},
        '8 validation errors detected: ' +
        'Value \'-1\' at \'limit\' failed to satisfy constraint: ' +
        'Member must have value greater than or equal to 1; ' +
        'Value \'\' at \'keyConditions.b.member.comparisonOperator\' failed to satisfy constraint: ' +
        'Member must satisfy enum value set: [IN, NULL, BETWEEN, LT, NOT_CONTAINS, EQ, GT, NOT_NULL, NE, LE, BEGINS_WITH, GE, CONTAINS]; ' +
        'Value null at \'keyConditions.a.member.comparisonOperator\' failed to satisfy constraint: ' +
        'Member must not be null; ' +
        'Value \'hi\' at \'returnConsumedCapacity\' failed to satisfy constraint: ' +
        'Member must satisfy enum value set: [INDEXES, TOTAL, NONE]; ' +
        'Value \'[]\' at \'attributesToGet\' failed to satisfy constraint: ' +
        'Member must have length greater than or equal to 1; ' +
        'Value \'abc;\' at \'tableName\' failed to satisfy constraint: ' +
        'Member must satisfy regular expression pattern: [a-zA-Z0-9_.-]+; ' +
        'Value \'hi\' at \'select\' failed to satisfy constraint: ' +
        'Member must satisfy enum value set: [SPECIFIC_ATTRIBUTES, COUNT, ALL_ATTRIBUTES, ALL_PROJECTED_ATTRIBUTES]; ' +
        'Value \'abc;\' at \'indexName\' failed to satisfy constraint: ' +
        'Member must satisfy regular expression pattern: [a-zA-Z0-9_.-]+', done)
    })

    it('should return ValidationException for null conditions', function(done) {
      assertValidation({TableName: 'abc'},
        'Conditions must not be null', done)
    })

    it('should return ValidationException for empty conditions', function(done) {
      assertValidation({TableName: 'abc', KeyConditions: {}},
        'Conditions can be of length 1 or 2 only', done)
    })

    it('should return ValidationException for incorrect number of filter arguments', function(done) {
      assertValidation({
        TableName: 'abc',
        KeyConditions: {
          a: {ComparisonOperator: 'EQ'},
          b: {ComparisonOperator: 'NULL'},
          c: {ComparisonOperator: 'NULL'},
        }},
        'The attempted filter operation is not supported for the provided filter argument count', done)
    })

    it('should return ValidationException for bad key type', function(done) {
      assertValidation({
        TableName: 'abc',
        KeyConditions: {
          a: {ComparisonOperator: 'EQ', AttributeValueList: [{}]},
          b: {ComparisonOperator: 'NULL'},
          c: {ComparisonOperator: 'NULL'},
        }},
        'Supplied AttributeValue is empty, must contain exactly one of the supported datatypes', done)
    })

    it('should return ValidationException for bad key type', function(done) {
      assertValidation({
        TableName: 'abc',
        KeyConditions: {
          a: {ComparisonOperator: 'EQ', AttributeValueList: [{a: ''}]},
          b: {ComparisonOperator: 'NULL'},
          c: {ComparisonOperator: 'NULL'},
        }},
        'Supplied AttributeValue is empty, must contain exactly one of the supported datatypes', done)
    })

    it('should return ValidationException for empty key', function(done) {
      assertValidation({
        TableName: 'abc',
        KeyConditions: {
          a: {ComparisonOperator: 'EQ', AttributeValueList: [{S: ''}]},
          b: {ComparisonOperator: 'NULL'},
          c: {ComparisonOperator: 'NULL'},
        }},
        'One or more parameter values were invalid: An AttributeValue may not contain an empty string.', done)
    })

    it('should return empty response if key has incorrect numeric type', function(done) {
      assertValidation({
        TableName: 'abc',
        KeyConditions: {
          a: {ComparisonOperator: 'EQ', AttributeValueList: [{N: 'b'}]},
          b: {ComparisonOperator: 'NULL'},
          c: {ComparisonOperator: 'NULL'},
        }},
        'The parameter cannot be converted to a numeric value: b', done)
    })

    it('should return ValidationException for too many filter args', function(done) {
      assertValidation({
        TableName: 'abc',
        KeyConditions: {
          a: {ComparisonOperator: 'EQ', AttributeValueList: [{S: 'a'}, {S: 'a'}]},
          b: {ComparisonOperator: 'NULL'},
          c: {ComparisonOperator: 'NULL'},
        }},
        'The attempted filter operation is not supported for the provided filter argument count', done)
    })

    it('should return ValidationException for 1 arg to NULL', function(done) {
      assertValidation({
        TableName: 'abc',
        KeyConditions: {a: {ComparisonOperator: 'NULL', AttributeValueList: [{S: 'a'}]}}},
        'The attempted filter operation is not supported for the provided filter argument count', done)
    })

    it('should return ValidationException for 1 arg to NOT_NULL', function(done) {
      assertValidation({
        TableName: 'abc',
        KeyConditions: {a: {ComparisonOperator: 'NOT_NULL', AttributeValueList: [{S: 'a'}]}}},
        'The attempted filter operation is not supported for the provided filter argument count', done)
    })

    it('should return ValidationException for 0 args to NE', function(done) {
      assertValidation({
        TableName: 'abc',
        KeyConditions: {a: {ComparisonOperator: 'NE'}}},
        'The attempted filter operation is not supported for the provided filter argument count', done)
    })

    it('should return ValidationException for 2 args to NE', function(done) {
      assertValidation({
        TableName: 'abc',
        KeyConditions: {a: {ComparisonOperator: 'NE', AttributeValueList: [{S: 'a'}, {S: 'a'}]}}},
        'The attempted filter operation is not supported for the provided filter argument count', done)
    })

    it('should return ValidationException for 0 args to LE', function(done) {
      assertValidation({
        TableName: 'abc',
        KeyConditions: {a: {ComparisonOperator: 'LE'}}},
        'The attempted filter operation is not supported for the provided filter argument count', done)
    })

    it('should return ValidationException for 2 args to LE', function(done) {
      assertValidation({
        TableName: 'abc',
        KeyConditions: {a: {ComparisonOperator: 'LE', AttributeValueList: [{S: 'a'}, {S: 'a'}]}}},
        'The attempted filter operation is not supported for the provided filter argument count', done)
    })

    it('should return ValidationException for 0 args to LT', function(done) {
      assertValidation({
        TableName: 'abc',
        KeyConditions: {a: {ComparisonOperator: 'LT'}}},
        'The attempted filter operation is not supported for the provided filter argument count', done)
    })

    it('should return ValidationException for 2 args to LT', function(done) {
      assertValidation({
        TableName: 'abc',
        KeyConditions: {a: {ComparisonOperator: 'LT', AttributeValueList: [{S: 'a'}, {S: 'a'}]}}},
        'The attempted filter operation is not supported for the provided filter argument count', done)
    })

    it('should return ValidationException for 0 args to GE', function(done) {
      assertValidation({
        TableName: 'abc',
        KeyConditions: {a: {ComparisonOperator: 'GE'}}},
        'The attempted filter operation is not supported for the provided filter argument count', done)
    })

    it('should return ValidationException for 2 args to GE', function(done) {
      assertValidation({
        TableName: 'abc',
        KeyConditions: {a: {ComparisonOperator: 'GE', AttributeValueList: [{S: 'a'}, {S: 'a'}]}}},
        'The attempted filter operation is not supported for the provided filter argument count', done)
    })

    it('should return ValidationException for 0 args to GT', function(done) {
      assertValidation({
        TableName: 'abc',
        KeyConditions: {a: {ComparisonOperator: 'GT'}}},
        'The attempted filter operation is not supported for the provided filter argument count', done)
    })

    it('should return ValidationException for 2 args to GT', function(done) {
      assertValidation({
        TableName: 'abc',
        KeyConditions: {a: {ComparisonOperator: 'GT', AttributeValueList: [{S: 'a'}, {S: 'a'}]}}},
        'The attempted filter operation is not supported for the provided filter argument count', done)
    })

    it('should return ValidationException for 0 args to CONTAINS', function(done) {
      assertValidation({
        TableName: 'abc',
        KeyConditions: {a: {ComparisonOperator: 'CONTAINS'}}},
        'The attempted filter operation is not supported for the provided filter argument count', done)
    })

    it('should return ValidationException for 2 args to CONTAINS', function(done) {
      assertValidation({
        TableName: 'abc',
        KeyConditions: {a: {ComparisonOperator: 'CONTAINS', AttributeValueList: [{S: 'a'}, {S: 'a'}]}}},
        'The attempted filter operation is not supported for the provided filter argument count', done)
    })

    it('should return ValidationException for 0 args to NOT_CONTAINS', function(done) {
      assertValidation({
        TableName: 'abc',
        KeyConditions: {a: {ComparisonOperator: 'NOT_CONTAINS'}}},
        'The attempted filter operation is not supported for the provided filter argument count', done)
    })

    it('should return ValidationException for 2 args to NOT_CONTAINS', function(done) {
      assertValidation({
        TableName: 'abc',
        KeyConditions: {a: {ComparisonOperator: 'NOT_CONTAINS', AttributeValueList: [{S: 'a'}, {S: 'a'}]}}},
        'The attempted filter operation is not supported for the provided filter argument count', done)
    })

    it('should return ValidationException for 0 args to BEGINS_WITH', function(done) {
      assertValidation({
        TableName: 'abc',
        KeyConditions: {a: {ComparisonOperator: 'BEGINS_WITH'}}},
        'The attempted filter operation is not supported for the provided filter argument count', done)
    })

    it('should return ValidationException for 2 args to BEGINS_WITH', function(done) {
      assertValidation({
        TableName: 'abc',
        KeyConditions: {a: {ComparisonOperator: 'BEGINS_WITH', AttributeValueList: [{S: 'a'}, {S: 'a'}]}}},
        'The attempted filter operation is not supported for the provided filter argument count', done)
    })

    it('should return ValidationException for 0 args to IN', function(done) {
      assertValidation({
        TableName: 'abc',
        KeyConditions: {a: {ComparisonOperator: 'IN'}}},
        'The attempted filter operation is not supported for the provided filter argument count', done)
    })

    it('should return ValidationException for 0 args to BETWEEN', function(done) {
      assertValidation({
        TableName: 'abc',
        KeyConditions: {a: {ComparisonOperator: 'BETWEEN'}}},
        'The attempted filter operation is not supported for the provided filter argument count', done)
    })

    it('should return ValidationException for 3 args to BETWEEN', function(done) {
      assertValidation({
        TableName: 'abc',
        KeyConditions: {a: {ComparisonOperator: 'BETWEEN', AttributeValueList: [{S: 'a'}, {S: 'a'}, {S: 'a'}]}}},
        'The attempted filter operation is not supported for the provided filter argument count', done)
    })

    it('should return ValidationException for too many conditions', function(done) {
      assertValidation({
        TableName: 'abc',
        ExclusiveStartKey: {},
        KeyConditions: {
          a: {ComparisonOperator: 'NULL'},
          b: {ComparisonOperator: 'NULL'},
          c: {ComparisonOperator: 'NULL'},
        }},
        'Conditions can be of length 1 or 2 only', done)
    })

    it('should return ValidationException for empty object ExclusiveStartKey', function(done) {
      assertValidation({
        TableName: 'abc',
        ExclusiveStartKey: {a: {}},
        KeyConditions: {a: {ComparisonOperator: 'NULL'}}},
        'The provided starting key is invalid: ' +
        'Supplied AttributeValue is empty, must contain exactly one of the supported datatypes', done)
    })

    it('should return ValidationException for wrong attribute ExclusiveStartKey', function(done) {
      assertValidation({
        TableName: 'abc',
        ExclusiveStartKey: {a: {a: ''}},
        KeyConditions: {a: {ComparisonOperator: 'NULL'}}},
        'The provided starting key is invalid: ' +
        'Supplied AttributeValue is empty, must contain exactly one of the supported datatypes', done)
    })

    it('should return ValidationException for empty string ExclusiveStartKey', function(done) {
      assertValidation({
        TableName: 'abc',
        ExclusiveStartKey: {a: {S: ''}},
        KeyConditions: {a: {ComparisonOperator: 'NULL'}}},
        'The provided starting key is invalid: ' +
        'One or more parameter values were invalid: An AttributeValue may not contain an empty string.', done)
    })

    it('should return ValidationException for empty binary', function(done) {
      assertValidation({
        TableName: 'abc',
        ExclusiveStartKey: {a: {B: ''}},
        KeyConditions: {a: {ComparisonOperator: 'NULL'}}},
        'The provided starting key is invalid: ' +
        'One or more parameter values were invalid: An AttributeValue may not contain an empty binary type.', done)
    })

    // Somehow allows set types for keys
    it('should return ValidationException for empty set key', function(done) {
      assertValidation({
        TableName: 'abc',
        ExclusiveStartKey: {a: {SS: []}},
        KeyConditions: {a: {ComparisonOperator: 'NULL'}}},
        'The provided starting key is invalid: ' +
        'One or more parameter values were invalid: An AttributeValue may not contain an empty set.', done)
    })

    it('should return ValidationException for empty string in set', function(done) {
      assertValidation({
        TableName: 'abc',
        ExclusiveStartKey: {a: {SS: ['a', '']}},
        KeyConditions: {a: {ComparisonOperator: 'NULL'}}},
        'The provided starting key is invalid: ' +
        'One or more parameter values were invalid: An AttributeValue may not contain an empty string.', done)
    })

    it('should return ValidationException for empty binary in set', function(done) {
      assertValidation({
        TableName: 'abc',
        ExclusiveStartKey: {a: {BS: ['aaaa', '']}},
        KeyConditions: {a: {ComparisonOperator: 'NULL'}}},
        'The provided starting key is invalid: ' +
        'One or more parameter values were invalid: Binary sets may not contain null or empty values', done)
    })

    it('should return ValidationException for multiple types', function(done) {
      assertValidation({
        TableName: 'abc',
        ExclusiveStartKey: {a: {S: 'a', N: '1'}},
        KeyConditions: {a: {ComparisonOperator: 'NULL'}}},
        'The provided starting key is invalid: ' +
        'Supplied AttributeValue has more than one datatypes set, must contain exactly one of the supported datatypes', done)
    })

    it('should return ValidationException if key has empty numeric type', function(done) {
      assertValidation({
        TableName: 'abc',
        ExclusiveStartKey: {a: {N: ''}},
        KeyConditions: {a: {ComparisonOperator: 'NULL'}}},
        'The provided starting key is invalid: ' +
        'The parameter cannot be converted to a numeric value', done)
    })

    it('should return ValidationException if key has incorrect numeric type', function(done) {
      assertValidation({
        TableName: 'abc',
        ExclusiveStartKey: {a: {N: 'b'}},
        KeyConditions: {a: {ComparisonOperator: 'NULL'}}},
        'The provided starting key is invalid: ' +
        'The parameter cannot be converted to a numeric value: b', done)
    })

    it('should return ValidationException if key has empty numeric type in set', function(done) {
      assertValidation({
        TableName: 'abc',
        ExclusiveStartKey: {a: {NS: ['1', '']}},
        KeyConditions: {a: {ComparisonOperator: 'NULL'}}},
        'The provided starting key is invalid: ' +
        'The parameter cannot be converted to a numeric value', done)
    })

    it('should return ValidationException if key has incorrect numeric type in set', function(done) {
      assertValidation({
        TableName: 'abc',
        ExclusiveStartKey: {a: {NS: ['1', 'b', 'a']}},
        KeyConditions: {a: {ComparisonOperator: 'NULL'}}},
        'The provided starting key is invalid: ' +
        'The parameter cannot be converted to a numeric value: b', done)
    })

    it('should return ValidationException if querying with NULL', function(done) {
      assertValidation({
        TableName: helpers.testHashTable,
        KeyConditions: {a: {ComparisonOperator: 'NULL'}},
      }, 'Attempted conditional constraint is not an indexable operation', done)
    })

    it('should return ValidationException if querying with NOT_NULL', function(done) {
      assertValidation({
        TableName: helpers.testHashTable,
        KeyConditions: {a: {ComparisonOperator: 'NOT_NULL'}},
      }, 'Attempted conditional constraint is not an indexable operation', done)
    })

    it('should return ValidationException if querying with CONTAINS', function(done) {
      assertValidation({
        TableName: helpers.testHashTable,
        KeyConditions: {a: {ComparisonOperator: 'CONTAINS', AttributeValueList: [{S: 'a'}]}},
      }, 'Attempted conditional constraint is not an indexable operation', done)
    })

    it('should return ValidationException if querying with NOT_CONTAINS', function(done) {
      assertValidation({
        TableName: helpers.testHashTable,
        KeyConditions: {a: {ComparisonOperator: 'NOT_CONTAINS', AttributeValueList: [{S: 'a'}]}},
      }, 'Attempted conditional constraint is not an indexable operation', done)
    })

    it('should return ValidationException if querying with IN', function(done) {
      assertValidation({
        TableName: helpers.testHashTable,
        KeyConditions: {a: {ComparisonOperator: 'IN', AttributeValueList: [{S: 'a'}]}},
      }, 'Attempted conditional constraint is not an indexable operation', done)
    })

    it('should return ValidationException if querying with LE', function(done) {
      assertValidation({
        TableName: helpers.testHashTable,
        KeyConditions: {a: {ComparisonOperator: 'LE', AttributeValueList: [{S: 'a'}]}},
      }, 'Query key condition not supported', done)
    })

    it('should return ValidationException if querying with LT', function(done) {
      assertValidation({
        TableName: helpers.testHashTable,
        KeyConditions: {a: {ComparisonOperator: 'LT', AttributeValueList: [{S: 'a'}]}},
      }, 'Query key condition not supported', done)
    })

    it('should return ValidationException if querying with GE', function(done) {
      assertValidation({
        TableName: helpers.testHashTable,
        KeyConditions: {a: {ComparisonOperator: 'GE', AttributeValueList: [{S: 'a'}]}},
      }, 'Query key condition not supported', done)
    })

    it('should return ValidationException if querying with GT', function(done) {
      assertValidation({
        TableName: helpers.testHashTable,
        KeyConditions: {a: {ComparisonOperator: 'GT', AttributeValueList: [{S: 'a'}]}},
      }, 'Query key condition not supported', done)
    })

    it('should return ValidationException if querying with BEGINS_WITH', function(done) {
      assertValidation({
        TableName: helpers.testHashTable,
        KeyConditions: {a: {ComparisonOperator: 'BEGINS_WITH', AttributeValueList: [{S: 'a'}]}},
      }, 'Query key condition not supported', done)
    })

    it('should return ValidationException if querying with BETWEEN', function(done) {
      assertValidation({
        TableName: helpers.testHashTable,
        KeyConditions: {a: {ComparisonOperator: 'BETWEEN', AttributeValueList: [{S: 'a'}, {S: 'b'}]}},
      }, 'Query key condition not supported', done)
    })

    it('should return ValidationException if querying hash table with extra param', function(done) {
      assertValidation({
        TableName: helpers.testHashTable,
        KeyConditions: {
          a: {ComparisonOperator: 'EQ', AttributeValueList: [{S: helpers.randomString()}]},
          b: {ComparisonOperator: 'EQ', AttributeValueList: [{S: helpers.randomString()}]},
        },
      }, 'Query key condition not supported', done)
    })

    // Weird - only checks this *after* it finds the table
    it('should return ValidationException for unsupported comparison', function(done) {
      assertValidation({
        TableName: helpers.testRangeTable,
        KeyConditions: {
          a: {ComparisonOperator: 'CONTAINS', AttributeValueList: [{S: 'a'}]},
          b: {ComparisonOperator: 'NULL'},
        }},
        'Attempted conditional constraint is not an indexable operation', done)
    })

    // TODO: It only reports this if the table exists, otherwise a ResourceNotFoundException
    it('should return ValidationException for empty ExclusiveStartKey', function(done) {
      assertValidation({
        TableName: helpers.testRangeTable,
        ExclusiveStartKey: {},
        KeyConditions: {a: {ComparisonOperator: 'NULL'}}},
        'The provided starting key is invalid', done)
    })

    it('should return ValidationException for no hash key', function(done) {
      assertValidation({
        TableName: helpers.testRangeTable,
        KeyConditions: {c: {ComparisonOperator: 'NULL'}}},
        'Query condition missed key schema element a', done)
    })

    it('should return ValidationException for missing index name', function(done) {
      assertValidation({
        TableName: helpers.testRangeTable,
        KeyConditions: {
          a: {ComparisonOperator: 'EQ', AttributeValueList: [{S: 'a'}]},
          c: {ComparisonOperator: 'NULL'},
        }},
        'Query condition missed key schema element b', done)
    })

    it('should return ValidationException for non-existent index name', function(done) {
      assertValidation({
        TableName: helpers.testRangeTable,
        IndexName: 'whatever',
        KeyConditions: {
          a: {ComparisonOperator: 'EQ', AttributeValueList: [{S: 'a'}]},
          c: {ComparisonOperator: 'NULL'},
        }},
        'The table does not have the specified index', done)
    })

    it('should return ValidationException for incorrect index', function(done) {
      assertValidation({
        TableName: helpers.testRangeTable,
        IndexName: 'index2',
        KeyConditions: {
          a: {ComparisonOperator: 'EQ', AttributeValueList: [{S: 'a'}]},
          c: {ComparisonOperator: 'NULL'},
        }},
        'Query condition missed key schema element d', done)
    })

    it('should return ValidationException for incorrect comparison operator on index', function(done) {
      assertValidation({
        TableName: helpers.testRangeTable,
        IndexName: 'index1',
        KeyConditions: {
          a: {ComparisonOperator: 'EQ', AttributeValueList: [{S: 'a'}]},
          c: {ComparisonOperator: 'NULL'},
        }},
        'Attempted conditional constraint is not an indexable operation', done)
    })

  })

  describe('functionality', function() {

    it('should query a hash table when empty', function(done) {
      request(opts({TableName: helpers.testHashTable, KeyConditions: {
        a: {ComparisonOperator: 'EQ', AttributeValueList: [{S: helpers.randomString()}]},
      }}), function(err, res) {
        if (err) return done(err)
        res.statusCode.should.equal(200)
        res.body.should.eql({Count: 0, Items: []})
        done()
      })
    })

    it('should query a hash table with items', function(done) {
      var item = {a: {S: helpers.randomString()}, b: {N: helpers.randomString()}},
          item2 = {a: {S: helpers.randomString()}, b: item.b},
          item3 = {a: {S: helpers.randomString()}, b: {N: helpers.randomString()}},
          batchReq = {RequestItems: {}}
      batchReq.RequestItems[helpers.testHashTable] = [
        {PutRequest: {Item: item}},
        {PutRequest: {Item: item2}},
        {PutRequest: {Item: item3}},
      ]
      request(helpers.opts('BatchWriteItem', batchReq), function(err, res) {
        if (err) return done(err)
        res.statusCode.should.equal(200)
        request(opts({TableName: helpers.testHashTable, KeyConditions: {
          a: {ComparisonOperator: 'EQ', AttributeValueList: [item2.a]},
        }}), function(err, res) {
          if (err) return done(err)
          res.statusCode.should.equal(200)
          res.body.should.eql({Count: 1, Items: [item2]})
          done()
        })
      })
    })

    it('should query a range table with EQ on just hash key', function(done) {
      var item = {a: {S: helpers.randomString()}, b: {S: '1'}},
          item2 = {a: item.a, b: {S: '2'}},
          item3 = {a: item.a, b: {S: '3'}},
          batchReq = {RequestItems: {}}
      batchReq.RequestItems[helpers.testRangeTable] = [
        {PutRequest: {Item: item}},
        {PutRequest: {Item: item2}},
        {PutRequest: {Item: item3}},
      ]
      request(helpers.opts('BatchWriteItem', batchReq), function(err, res) {
        if (err) return done(err)
        res.statusCode.should.equal(200)
        request(opts({TableName: helpers.testRangeTable, KeyConditions: {
          a: {ComparisonOperator: 'EQ', AttributeValueList: [item.a]},
        }}), function(err, res) {
          if (err) return done(err)
          res.statusCode.should.equal(200)
          res.body.should.eql({Count: 3, Items: [item, item2, item3]})
          done()
        })
      })
    })

    it('should query a range table with EQ', function(done) {
      var item = {a: {S: helpers.randomString()}, b: {S: '1'}},
          item2 = {a: item.a, b: {S: '2'}},
          item3 = {a: item.a, b: {S: '3'}},
          batchReq = {RequestItems: {}}
      batchReq.RequestItems[helpers.testRangeTable] = [
        {PutRequest: {Item: item}},
        {PutRequest: {Item: item2}},
        {PutRequest: {Item: item3}},
      ]
      request(helpers.opts('BatchWriteItem', batchReq), function(err, res) {
        if (err) return done(err)
        res.statusCode.should.equal(200)
        request(opts({TableName: helpers.testRangeTable, KeyConditions: {
          a: {ComparisonOperator: 'EQ', AttributeValueList: [item.a]},
          b: {ComparisonOperator: 'EQ', AttributeValueList: [item2.b]},
        }}), function(err, res) {
          if (err) return done(err)
          res.statusCode.should.equal(200)
          res.body.should.eql({Count: 1, Items: [item2]})
          done()
        })
      })
    })

    it('should query a range table with LE', function(done) {
      var item = {a: {S: helpers.randomString()}, b: {S: '1'}},
          item2 = {a: item.a, b: {S: '2'}},
          item3 = {a: item.a, b: {S: '3'}},
          batchReq = {RequestItems: {}}
      batchReq.RequestItems[helpers.testRangeTable] = [
        {PutRequest: {Item: item}},
        {PutRequest: {Item: item2}},
        {PutRequest: {Item: item3}},
      ]
      request(helpers.opts('BatchWriteItem', batchReq), function(err, res) {
        if (err) return done(err)
        res.statusCode.should.equal(200)
        request(opts({TableName: helpers.testRangeTable, KeyConditions: {
          a: {ComparisonOperator: 'EQ', AttributeValueList: [item.a]},
          b: {ComparisonOperator: 'LE', AttributeValueList: [item2.b]},
        }}), function(err, res) {
          if (err) return done(err)
          res.statusCode.should.equal(200)
          res.body.should.eql({Count: 2, Items: [item, item2]})
          done()
        })
      })
    })

    it('should query a range table with LT', function(done) {
      var item = {a: {S: helpers.randomString()}, b: {S: '1'}},
          item2 = {a: item.a, b: {S: '2'}},
          item3 = {a: item.a, b: {S: '3'}},
          batchReq = {RequestItems: {}}
      batchReq.RequestItems[helpers.testRangeTable] = [
        {PutRequest: {Item: item}},
        {PutRequest: {Item: item2}},
        {PutRequest: {Item: item3}},
      ]
      request(helpers.opts('BatchWriteItem', batchReq), function(err, res) {
        if (err) return done(err)
        res.statusCode.should.equal(200)
        request(opts({TableName: helpers.testRangeTable, KeyConditions: {
          a: {ComparisonOperator: 'EQ', AttributeValueList: [item.a]},
          b: {ComparisonOperator: 'LT', AttributeValueList: [item2.b]},
        }}), function(err, res) {
          if (err) return done(err)
          res.statusCode.should.equal(200)
          res.body.should.eql({Count: 1, Items: [item]})
          done()
        })
      })
    })

    it('should query a range table with GE', function(done) {
      var item = {a: {S: helpers.randomString()}, b: {S: '1'}},
          item2 = {a: item.a, b: {S: '2'}},
          item3 = {a: item.a, b: {S: '3'}},
          batchReq = {RequestItems: {}}
      batchReq.RequestItems[helpers.testRangeTable] = [
        {PutRequest: {Item: item}},
        {PutRequest: {Item: item2}},
        {PutRequest: {Item: item3}},
      ]
      request(helpers.opts('BatchWriteItem', batchReq), function(err, res) {
        if (err) return done(err)
        res.statusCode.should.equal(200)
        request(opts({TableName: helpers.testRangeTable, KeyConditions: {
          a: {ComparisonOperator: 'EQ', AttributeValueList: [item.a]},
          b: {ComparisonOperator: 'GE', AttributeValueList: [item2.b]},
        }}), function(err, res) {
          if (err) return done(err)
          res.statusCode.should.equal(200)
          res.body.should.eql({Count: 2, Items: [item2, item3]})
          done()
        })
      })
    })

    it('should query a range table with GT', function(done) {
      var item = {a: {S: helpers.randomString()}, b: {S: '1'}},
          item2 = {a: item.a, b: {S: '2'}},
          item3 = {a: item.a, b: {S: '3'}},
          batchReq = {RequestItems: {}}
      batchReq.RequestItems[helpers.testRangeTable] = [
        {PutRequest: {Item: item}},
        {PutRequest: {Item: item2}},
        {PutRequest: {Item: item3}},
      ]
      request(helpers.opts('BatchWriteItem', batchReq), function(err, res) {
        if (err) return done(err)
        res.statusCode.should.equal(200)
        request(opts({TableName: helpers.testRangeTable, KeyConditions: {
          a: {ComparisonOperator: 'EQ', AttributeValueList: [item.a]},
          b: {ComparisonOperator: 'GT', AttributeValueList: [item2.b]},
        }}), function(err, res) {
          if (err) return done(err)
          res.statusCode.should.equal(200)
          res.body.should.eql({Count: 1, Items: [item3]})
          done()
        })
      })
    })

    it('should query a range table with BEGINS_WITH', function(done) {
      var item = {a: {S: helpers.randomString()}, b: {S: 'aaa'}},
          item2 = {a: item.a, b: {S: 'aab'}},
          item3 = {a: item.a, b: {S: 'abc'}},
          batchReq = {RequestItems: {}}
      batchReq.RequestItems[helpers.testRangeTable] = [
        {PutRequest: {Item: item}},
        {PutRequest: {Item: item2}},
        {PutRequest: {Item: item3}},
      ]
      request(helpers.opts('BatchWriteItem', batchReq), function(err, res) {
        if (err) return done(err)
        res.statusCode.should.equal(200)
        request(opts({TableName: helpers.testRangeTable, KeyConditions: {
          a: {ComparisonOperator: 'EQ', AttributeValueList: [item.a]},
          b: {ComparisonOperator: 'BEGINS_WITH', AttributeValueList: [{S: 'aa'}]},
        }}), function(err, res) {
          if (err) return done(err)
          res.statusCode.should.equal(200)
          res.body.should.eql({Count: 2, Items: [item, item2]})
          done()
        })
      })
    })

    it('should query a range table with BETWEEN', function(done) {
      var item = {a: {S: helpers.randomString()}, b: {S: 'aa'}},
          item2 = {a: item.a, b: {S: 'ab'}},
          item3 = {a: item.a, b: {S: 'abc'}},
          item4 = {a: item.a, b: {S: 'ac'}},
          item5 = {a: item.a, b: {S: 'aca'}},
          batchReq = {RequestItems: {}}
      batchReq.RequestItems[helpers.testRangeTable] = [
        {PutRequest: {Item: item}},
        {PutRequest: {Item: item2}},
        {PutRequest: {Item: item3}},
        {PutRequest: {Item: item4}},
        {PutRequest: {Item: item5}},
      ]
      request(helpers.opts('BatchWriteItem', batchReq), function(err, res) {
        if (err) return done(err)
        res.statusCode.should.equal(200)
        request(opts({TableName: helpers.testRangeTable, KeyConditions: {
          a: {ComparisonOperator: 'EQ', AttributeValueList: [item.a]},
          b: {ComparisonOperator: 'BETWEEN', AttributeValueList: [{S: 'ab'}, {S: 'ac'}]},
        }}), function(err, res) {
          if (err) return done(err)
          res.statusCode.should.equal(200)
          res.body.should.eql({Count: 3, Items: [item2, item3, item4]})
          done()
        })
      })
    })

    it('should only return requested attributes', function(done) {
      var item = {a: {S: helpers.randomString()}, b: {S: 'b1'}, d: {S: 'd1'}},
          item2 = {a: item.a, b: {S: 'b2'}},
          item3 = {a: item.a, b: {S: 'b3'}, d: {S: 'd3'}, e: {S: 'e3'}},
          batchReq = {RequestItems: {}}
      batchReq.RequestItems[helpers.testRangeTable] = [
        {PutRequest: {Item: item}},
        {PutRequest: {Item: item2}},
        {PutRequest: {Item: item3}},
      ]
      request(helpers.opts('BatchWriteItem', batchReq), function(err, res) {
        if (err) return done(err)
        res.statusCode.should.equal(200)
        request(opts({TableName: helpers.testRangeTable, KeyConditions: {
          a: {ComparisonOperator: 'EQ', AttributeValueList: [item.a]},
        }, AttributesToGet: ['b', 'd']}), function(err, res) {
          if (err) return done(err)
          res.statusCode.should.equal(200)
          res.body.should.eql({Count: 3, Items: [
            {b: {S: 'b1'}, d: {S: 'd1'}},
            {b: {S: 'b2'}},
            {b: {S: 'b3'}, d: {S: 'd3'}},
          ]})
          done()
        })
      })
    })

    it('should only return projected attributes by default for secondary indexes', function(done) {
      var item = {a: {S: helpers.randomString()}, b: {S: 'b1'}, c: {S: 'c1'}, d: {S: 'd1'}},
          item2 = {a: item.a, b: {S: 'b2'}},
          item3 = {a: item.a, b: {S: 'b3'}, d: {S: 'd3'}, e: {S: 'e3'}, f: {S: 'f3'}},
          item4 = {a: item.a, b: {S: 'b4'}, c: {S: 'c4'}, d: {S: 'd4'}, e: {S: 'e4'}},
          batchReq = {RequestItems: {}}
      batchReq.RequestItems[helpers.testRangeTable] = [
        {PutRequest: {Item: item}},
        {PutRequest: {Item: item2}},
        {PutRequest: {Item: item3}},
        {PutRequest: {Item: item4}},
      ]
      request(helpers.opts('BatchWriteItem', batchReq), function(err, res) {
        if (err) return done(err)
        res.statusCode.should.equal(200)
        request(opts({TableName: helpers.testRangeTable, IndexName: 'index2', KeyConditions: {
          a: {ComparisonOperator: 'EQ', AttributeValueList: [item.a]},
        }, ReturnConsumedCapacity: 'TOTAL'}), function(err, res) {
          if (err) return done(err)
          res.statusCode.should.equal(200)
          delete item3.e
          delete item3.f
          delete item4.e
          res.body.should.eql({Count: 3, Items: [item, item3, item4], ConsumedCapacity: {CapacityUnits: 0.5, TableName: helpers.testRangeTable}})
          done()
        })
      })
    })

    it('should return all attributes when specified for secondary indexes', function(done) {
      var item = {a: {S: helpers.randomString()}, b: {S: 'b1'}, c: {S: 'c1'}, d: {S: 'd1'}},
          item2 = {a: item.a, b: {S: 'b2'}},
          item3 = {a: item.a, b: {S: 'b3'}, d: {S: 'd3'}, e: {S: 'e3'}, f: {S: 'f3'}},
          item4 = {a: item.a, b: {S: 'b4'}, c: {S: 'c4'}, d: {S: 'd4'}, e: {S: 'e4'}},
          batchReq = {RequestItems: {}}
      batchReq.RequestItems[helpers.testRangeTable] = [
        {PutRequest: {Item: item}},
        {PutRequest: {Item: item2}},
        {PutRequest: {Item: item3}},
        {PutRequest: {Item: item4}},
      ]
      request(helpers.opts('BatchWriteItem', batchReq), function(err, res) {
        if (err) return done(err)
        res.statusCode.should.equal(200)
        request(opts({TableName: helpers.testRangeTable, IndexName: 'index2', KeyConditions: {
          a: {ComparisonOperator: 'EQ', AttributeValueList: [item.a]},
        }, Select: 'ALL_ATTRIBUTES', ReturnConsumedCapacity: 'TOTAL'}), function(err, res) {
          if (err) return done(err)
          res.statusCode.should.equal(200)
          res.body.should.eql({Count: 3, Items: [item, item3, item4], ConsumedCapacity: {CapacityUnits: 2, TableName: helpers.testRangeTable}})
          done()
        })
      })
    })

    it('should return COUNT if requested', function(done) {
      var item = {a: {S: helpers.randomString()}, b: {S: '2'}},
          item2 = {a: item.a, b: {S: '1'}},
          item3 = {a: item.a, b: {S: '3'}},
          item4 = {a: item.a, b: {S: '4'}},
          item5 = {a: item.a, b: {S: '5'}},
          batchReq = {RequestItems: {}}
      batchReq.RequestItems[helpers.testRangeTable] = [
        {PutRequest: {Item: item}},
        {PutRequest: {Item: item2}},
        {PutRequest: {Item: item3}},
        {PutRequest: {Item: item4}},
        {PutRequest: {Item: item5}},
      ]
      request(helpers.opts('BatchWriteItem', batchReq), function(err, res) {
        if (err) return done(err)
        res.statusCode.should.equal(200)
        request(opts({TableName: helpers.testRangeTable, KeyConditions: {
          a: {ComparisonOperator: 'EQ', AttributeValueList: [item.a]},
          b: {ComparisonOperator: 'GE', AttributeValueList: [item.b]},
        }, Select: 'COUNT'}), function(err, res) {
          if (err) return done(err)
          res.statusCode.should.equal(200)
          should.not.exist(res.body.Items)
          res.body.should.eql({Count: 4})
          done()
        })
      })
    })

    it('should only return Limit items if requested', function(done) {
      var item = {a: {S: helpers.randomString()}, b: {S: '2'}, c: {S: 'c'}},
          item2 = {a: item.a, b: {S: '1'}, c: {S: 'c'}},
          item3 = {a: item.a, b: {S: '3'}, c: {S: 'c'}},
          item4 = {a: item.a, b: {S: '4'}, c: {S: 'c'}},
          item5 = {a: item.a, b: {S: '5'}, c: {S: 'c'}},
          batchReq = {RequestItems: {}}
      batchReq.RequestItems[helpers.testRangeTable] = [
        {PutRequest: {Item: item}},
        {PutRequest: {Item: item2}},
        {PutRequest: {Item: item3}},
        {PutRequest: {Item: item4}},
        {PutRequest: {Item: item5}},
      ]
      request(helpers.opts('BatchWriteItem', batchReq), function(err, res) {
        if (err) return done(err)
        res.statusCode.should.equal(200)
        request(opts({TableName: helpers.testRangeTable, KeyConditions: {
          a: {ComparisonOperator: 'EQ', AttributeValueList: [item.a]},
          b: {ComparisonOperator: 'GE', AttributeValueList: [item.b]},
        }, Limit: 2}), function(err, res) {
          if (err) return done(err)
          res.statusCode.should.equal(200)
          res.body.should.eql({Count: 2, Items: [item, item3], LastEvaluatedKey: {a: item3.a, b: item3.b}})
          done()
        })
      })
    })

    it('should not return LastEvaluatedKey if Limit is at least size of response', function(done) {
      var item = {a: {S: helpers.randomString()}, b: {S: '1'}, c: {S: 'c'}},
          item2 = {a: item.a, b: {S: '2'}, c: {S: 'c'}},
          item3 = {a: {S: helpers.randomString()}, b: {S: '1'}, c: {S: 'c'}},
          item4 = {a: item3.a, b: {S: '2'}, c: {S: 'c'}},
          batchReq = {RequestItems: {}}
      batchReq.RequestItems[helpers.testRangeTable] = [
        {PutRequest: {Item: item}},
        {PutRequest: {Item: item2}},
        {PutRequest: {Item: item3}},
        {PutRequest: {Item: item4}},
      ]
      request(helpers.opts('BatchWriteItem', batchReq), function(err, res) {
        if (err) return done(err)
        res.statusCode.should.equal(200)
        request(helpers.opts('Scan', {TableName: helpers.testRangeTable}), function(err, res) {
          if (err) return done(err)
          res.statusCode.should.equal(200)
          var lastHashItem = res.body.Items[res.body.Items.length - 1],
              lastHashItems = res.body.Items.filter(function(item) { return item.a.S == lastHashItem.a.S }),
              otherHashItem = lastHashItem.a.S == item.a.S ? item3 : item,
              otherHashItems = res.body.Items.filter(function(item) { return item.a.S == otherHashItem.a.S })
          otherHashItems.length.should.equal(2)
          request(opts({TableName: helpers.testRangeTable, KeyConditions: {
            a: {ComparisonOperator: 'EQ', AttributeValueList: [lastHashItem.a]},
          }}), function(err, res) {
            if (err) return done(err)
            res.statusCode.should.equal(200)
            res.body.should.eql({Count: lastHashItems.length, Items: lastHashItems})
            request(opts({TableName: helpers.testRangeTable, KeyConditions: {
              a: {ComparisonOperator: 'EQ', AttributeValueList: [lastHashItem.a]},
            }, Limit: lastHashItems.length}), function(err, res) {
              if (err) return done(err)
              res.statusCode.should.equal(200)
              res.body.should.eql({Count: lastHashItems.length, Items: lastHashItems, LastEvaluatedKey: {a: lastHashItem.a, b: lastHashItem.b}})
              request(opts({TableName: helpers.testRangeTable, KeyConditions: {
                a: {ComparisonOperator: 'EQ', AttributeValueList: [otherHashItem.a]},
              }, Limit: 2}), function(err, res) {
                if (err) return done(err)
                res.statusCode.should.equal(200)
                res.body.should.eql({Count: 2, Items: otherHashItems})
                done()
              })
            })
          })
        })
      })
    })

    it('should return items in order for strings', function(done) {
      var item = {a: {S: helpers.randomString()}, b: {S: '1'}},
          item2 = {a: item.a, b: {S: '2'}},
          item3 = {a: item.a, b: {S: '10'}},
          item4 = {a: item.a, b: {S: 'a'}},
          item5 = {a: item.a, b: {S: 'b'}},
          item6 = {a: item.a, b: {S: 'aa'}},
          item7 = {a: item.a, b: {S: 'ab'}},
          item8 = {a: item.a, b: {S: 'A'}},
          item9 = {a: item.a, b: {S: 'B'}},
          batchReq = {RequestItems: {}}
      batchReq.RequestItems[helpers.testRangeTable] = [
        {PutRequest: {Item: item}},
        {PutRequest: {Item: item2}},
        {PutRequest: {Item: item3}},
        {PutRequest: {Item: item4}},
        {PutRequest: {Item: item5}},
        {PutRequest: {Item: item6}},
        {PutRequest: {Item: item7}},
        {PutRequest: {Item: item8}},
        {PutRequest: {Item: item9}},
      ]
      request(helpers.opts('BatchWriteItem', batchReq), function(err, res) {
        if (err) return done(err)
        res.statusCode.should.equal(200)
        request(opts({TableName: helpers.testRangeTable, KeyConditions: {
          a: {ComparisonOperator: 'EQ', AttributeValueList: [item.a]},
        }}), function(err, res) {
          if (err) return done(err)
          res.statusCode.should.equal(200)
          res.body.should.eql({Count: 9, Items: [item, item3, item2, item8, item9, item4, item6, item7, item5]})
          done()
        })
      })
    })

    it('should return items in order for secondary index strings', function(done) {
      var item = {a: {S: helpers.randomString()}, b: {S: '1'}, c: {S: '1'}, d: {S: '1'}},
          item2 = {a: item.a, b: {S: '2'}, c: {S: '2'}},
          item3 = {a: item.a, b: {S: '3'}, c: {S: '10'}},
          item4 = {a: item.a, b: {S: '4'}, c: {S: 'a'}},
          item5 = {a: item.a, b: {S: '5'}, c: {S: 'b'}},
          item6 = {a: item.a, b: {S: '6'}, c: {S: 'aa'}, e: {S: '6'}},
          item7 = {a: item.a, b: {S: '7'}, c: {S: 'ab'}},
          item8 = {a: item.a, b: {S: '8'}, c: {S: 'A'}},
          item9 = {a: item.a, b: {S: '9'}, c: {S: 'B'}},
          batchReq = {RequestItems: {}}
      batchReq.RequestItems[helpers.testRangeTable] = [
        {PutRequest: {Item: item}},
        {PutRequest: {Item: item2}},
        {PutRequest: {Item: item3}},
        {PutRequest: {Item: item4}},
        {PutRequest: {Item: item5}},
        {PutRequest: {Item: item6}},
        {PutRequest: {Item: item7}},
        {PutRequest: {Item: item8}},
        {PutRequest: {Item: item9}},
      ]
      request(helpers.opts('BatchWriteItem', batchReq), function(err, res) {
        if (err) return done(err)
        res.statusCode.should.equal(200)
        request(opts({TableName: helpers.testRangeTable, IndexName: 'index1', KeyConditions: {
          a: {ComparisonOperator: 'EQ', AttributeValueList: [item.a]},
        }}), function(err, res) {
          if (err) return done(err)
          res.statusCode.should.equal(200)
          res.body.should.eql({Count: 9, Items: [item, item3, item2, item8, item9, item4, item6, item7, item5]})
          done()
        })
      })
    })

    it('should return items in order for numbers', function(done) {
      var item = {a: {S: helpers.randomString()}, b: {N: '0'}},
          item2 = {a: item.a, b: {N: '99.1'}},
          item3 = {a: item.a, b: {N: '10.9'}},
          item4 = {a: item.a, b: {N: '10.1'}},
          item5 = {a: item.a, b: {N: '9.1'}},
          item6 = {a: item.a, b: {N: '9'}},
          item7 = {a: item.a, b: {N: '1.9'}},
          item8 = {a: item.a, b: {N: '1.1'}},
          item9 = {a: item.a, b: {N: '1'}},
          item10 = {a: item.a, b: {N: '0.9'}},
          item11 = {a: item.a, b: {N: '0.1'}},
          item12 = {a: item.a, b: {N: '0.09'}},
          item13 = {a: item.a, b: {N: '0.01'}},
          item14 = {a: item.a, b: {N: '-0.01'}},
          item15 = {a: item.a, b: {N: '-0.09'}},
          item16 = {a: item.a, b: {N: '-0.1'}},
          item17 = {a: item.a, b: {N: '-0.9'}},
          item18 = {a: item.a, b: {N: '-1'}},
          item19 = {a: item.a, b: {N: '-1.01'}},
          item20 = {a: item.a, b: {N: '-9'}},
          item21 = {a: item.a, b: {N: '-9.9'}},
          item22 = {a: item.a, b: {N: '-10.1'}},
          item23 = {a: item.a, b: {N: '-99.1'}},
          batchReq = {RequestItems: {}}
      batchReq.RequestItems[helpers.testRangeNTable] = [
        {PutRequest: {Item: item}},
        {PutRequest: {Item: item2}},
        {PutRequest: {Item: item3}},
        {PutRequest: {Item: item4}},
        {PutRequest: {Item: item5}},
        {PutRequest: {Item: item6}},
        {PutRequest: {Item: item7}},
        {PutRequest: {Item: item8}},
        {PutRequest: {Item: item9}},
        {PutRequest: {Item: item10}},
        {PutRequest: {Item: item11}},
        {PutRequest: {Item: item12}},
        {PutRequest: {Item: item13}},
        {PutRequest: {Item: item14}},
        {PutRequest: {Item: item15}},
        {PutRequest: {Item: item16}},
        {PutRequest: {Item: item17}},
        {PutRequest: {Item: item18}},
        {PutRequest: {Item: item19}},
        {PutRequest: {Item: item20}},
        {PutRequest: {Item: item21}},
        {PutRequest: {Item: item22}},
        {PutRequest: {Item: item23}},
      ]
      request(helpers.opts('BatchWriteItem', batchReq), function(err, res) {
        if (err) return done(err)
        res.statusCode.should.equal(200)
        request(opts({TableName: helpers.testRangeNTable, KeyConditions: {
          a: {ComparisonOperator: 'EQ', AttributeValueList: [item.a]},
        }}), function(err, res) {
          if (err) return done(err)
          res.statusCode.should.equal(200)
          res.body.should.eql({Count: 23, Items: [item23, item22, item21, item20, item19, item18, item17, item16, item15,
            item14, item, item13, item12, item11, item10, item9, item8, item7, item6, item5, item4, item3, item2]})
          done()
        })
      })
    })

    it('should return items in reverse order for strings', function(done) {
      var item = {a: {S: helpers.randomString()}, b: {S: '1'}},
          item2 = {a: item.a, b: {S: '2'}},
          item3 = {a: item.a, b: {S: '10'}},
          batchReq = {RequestItems: {}}
      batchReq.RequestItems[helpers.testRangeTable] = [
        {PutRequest: {Item: item}},
        {PutRequest: {Item: item2}},
        {PutRequest: {Item: item3}},
      ]
      request(helpers.opts('BatchWriteItem', batchReq), function(err, res) {
        if (err) return done(err)
        res.statusCode.should.equal(200)
        request(opts({TableName: helpers.testRangeTable, KeyConditions: {
          a: {ComparisonOperator: 'EQ', AttributeValueList: [item.a]},
        }, ScanIndexForward: false}), function(err, res) {
          if (err) return done(err)
          res.statusCode.should.equal(200)
          res.body.should.eql({Count: 3, Items: [item2, item3, item]})
          done()
        })
      })
    })

    it('should return items in reverse order with Limit for strings', function(done) {
      var item = {a: {S: helpers.randomString()}, b: {S: '1'}},
          item2 = {a: item.a, b: {S: '2'}},
          item3 = {a: item.a, b: {S: '10'}},
          batchReq = {RequestItems: {}}
      batchReq.RequestItems[helpers.testRangeTable] = [
        {PutRequest: {Item: item}},
        {PutRequest: {Item: item2}},
        {PutRequest: {Item: item3}},
      ]
      request(helpers.opts('BatchWriteItem', batchReq), function(err, res) {
        if (err) return done(err)
        res.statusCode.should.equal(200)
        request(opts({TableName: helpers.testRangeTable, KeyConditions: {
          a: {ComparisonOperator: 'EQ', AttributeValueList: [item.a]},
        }, ScanIndexForward: false, Limit: 2}), function(err, res) {
          if (err) return done(err)
          res.statusCode.should.equal(200)
          res.body.should.eql({Count: 2, Items: [item2, item3], LastEvaluatedKey: item3})
          done()
        })
      })
    })

    it('should return items in reverse order for numbers', function(done) {
      var item = {a: {S: helpers.randomString()}, b: {N: '0'}},
          item2 = {a: item.a, b: {N: '99.1'}},
          item3 = {a: item.a, b: {N: '10.9'}},
          item4 = {a: item.a, b: {N: '9.1'}},
          item5 = {a: item.a, b: {N: '0.9'}},
          item6 = {a: item.a, b: {N: '-0.01'}},
          item7 = {a: item.a, b: {N: '-0.1'}},
          item8 = {a: item.a, b: {N: '-1'}},
          item9 = {a: item.a, b: {N: '-99.1'}},
          batchReq = {RequestItems: {}}
      batchReq.RequestItems[helpers.testRangeNTable] = [
        {PutRequest: {Item: item}},
        {PutRequest: {Item: item2}},
        {PutRequest: {Item: item3}},
        {PutRequest: {Item: item4}},
        {PutRequest: {Item: item5}},
        {PutRequest: {Item: item6}},
        {PutRequest: {Item: item7}},
        {PutRequest: {Item: item8}},
        {PutRequest: {Item: item9}},
      ]
      request(helpers.opts('BatchWriteItem', batchReq), function(err, res) {
        if (err) return done(err)
        res.statusCode.should.equal(200)
        request(opts({TableName: helpers.testRangeNTable, KeyConditions: {
          a: {ComparisonOperator: 'EQ', AttributeValueList: [item.a]},
        }, ScanIndexForward: false}), function(err, res) {
          if (err) return done(err)
          res.statusCode.should.equal(200)
          res.body.should.eql({Count: 9, Items: [item2, item3, item4, item5, item, item6, item7, item8, item9]})
          done()
        })
      })
    })

    it('should return items in reverse order with Limit for numbers', function(done) {
      var item = {a: {S: helpers.randomString()}, b: {N: '0'}},
          item2 = {a: item.a, b: {N: '99.1'}, c: {S: 'c'}},
          item3 = {a: item.a, b: {N: '10.9'}, c: {S: 'c'}},
          item4 = {a: item.a, b: {N: '9.1'}, c: {S: 'c'}},
          item5 = {a: item.a, b: {N: '0.9'}, c: {S: 'c'}},
          batchReq = {RequestItems: {}}
      batchReq.RequestItems[helpers.testRangeNTable] = [
        {PutRequest: {Item: item}},
        {PutRequest: {Item: item2}},
        {PutRequest: {Item: item3}},
        {PutRequest: {Item: item4}},
        {PutRequest: {Item: item5}},
      ]
      request(helpers.opts('BatchWriteItem', batchReq), function(err, res) {
        if (err) return done(err)
        res.statusCode.should.equal(200)
        request(opts({TableName: helpers.testRangeNTable, KeyConditions: {
          a: {ComparisonOperator: 'EQ', AttributeValueList: [item.a]},
        }, ScanIndexForward: false, Limit: 3}), function(err, res) {
          if (err) return done(err)
          res.statusCode.should.equal(200)
          res.body.should.eql({Count: 3, Items: [item2, item3, item4], LastEvaluatedKey: {a: item4.a, b: item4.b}})
          done()
        })
      })
    })

  })

})


