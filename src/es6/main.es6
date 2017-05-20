import './lib.es6';
import $ from 'jquery';
import _ from 'underscore';

// initial
$(document).ready(() => {
    $('#staticModalButton').on('click', () => $('#staticModal').modal());
});