import { ThreemaConnector } from './../index';
import { AssertionError } from 'assert';

describe('constructor', () => {

    it('should fail for missing toIds', () => {
        function execute() {
            new ThreemaConnector();
        }
        expect(execute).toThrow(AssertionError);
    });

    it('should fail for empty toIds', () => {
        function execute() {
            new ThreemaConnector([], "from", "secret");
        }
        expect(execute).toThrow(AssertionError);
    });

    it('should fail for missing fromId', () => {
        function execute() {
            new ThreemaConnector(["to1"]);
        }
        expect(execute).toThrow(AssertionError);
    });

    it('should fail for empty fromId', () => {
        function execute() {
            new ThreemaConnector(["to1"], "");
        }
        expect(execute).toThrow(AssertionError);
    });

    it('should fail for missing secret', () => {
        function execute() {
            new ThreemaConnector(["to1"], "from");
        }
        expect(execute).toThrow(AssertionError);
    });

    it('should fail for empty secret', () => {
        function execute() {
            new ThreemaConnector(["to1"], "from", "");
        }
        expect(execute).toThrow(AssertionError);
    });

    it('should succeed', () => {
        function execute() {
            new ThreemaConnector(["to1"], "from", "secret");
        }
        expect(execute).not.toThrow();
    });

});
