const mongoose = require("mongoose");

const personalBudgetSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    value: {
        type: Number,
        required: true,
    },
    color: {
        type: String,
        required: true,
        validate: {
            validator: function(v) {
                // Regex to validate 6-digit hexadecimal color code
                return /^#[0-9A-Fa-f]{6}$/.test(v);
            },
            message: props => `${props.value} is not a valid hexadecimal color!`  // Custom error message
        }
    }
}, { collection: 'personal_budget'});

module.exports = mongoose.model('personal_budget', personalBudgetSchema);
