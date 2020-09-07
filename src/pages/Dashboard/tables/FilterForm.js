import React, { useState } from 'react';

import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';

import DialogTitle from '@material-ui/core/DialogTitle';

import Dialog from '@material-ui/core/Dialog';

import TextField from '@material-ui/core/TextField';

import Button from '@material-ui/core/Button';

import MomentUtils from '@date-io/moment';

import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider
} from '@material-ui/pickers';

const useStyles = makeStyles({
  filterItem: {
    width: '100%',

    height: 80,

    '&:last-child': {
      marginLeft: 25
    }
  },

  dateLabel: {
    marginBottom: 20,

    color: 'rgba(0, 0, 0, 0.6);'
  },

  calendar: {
    display: 'flex',

    width: '100%',

    flexDirection: 'row'
  },

  form: {
    display: 'flex',

    flexDirection: 'column',

    padding: 25,

    width: 600
  },

  applyButton: {
    height: 45
  }
});

function SimpleDialog(props) {
  const { fields } = props;

  const classes = useStyles();

  const { onClose, selectedValue, open, handleFilter } = props;

  const [startFrom, handleStartFrom] = useState(null);

  const [startTo, handleStartTo] = useState(null);

  const [endFrom, handleEndFrom] = useState(null);

  const [endTo, handleEndTo] = useState(null);

  const emptyFilters = {};

  fields.forEach(field => {
    if (field.id !== 'startDate' && field.id !== 'endDate') {
      emptyFilters[field.id] = '';
    }
  });

  const [filters, setFilters] = useState(emptyFilters);

  const handleClose = () => {
    setFilters(emptyFilters);

    onClose(selectedValue);
  };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
    >
      <DialogTitle id="simple-dialog-title">Filter</DialogTitle>

      <form className={classes.form}>
        {fields.map(field => {
          if (field.id === 'startDate' || field.id === 'endDate') {
            return (
              <MuiPickersUtilsProvider utils={MomentUtils}>
                <div className={classes.dateLabel}>
                  {field.id === 'startDate' ? 'Start Date:' : 'End Date:'}
                </div>

                <div className={classes.calendar}>
                  <KeyboardDatePicker
                    className={classes.filterItem}
                    autoOk
                    variant="inline"
                    inputVariant="outlined"
                    label="From"
                    format="MM/DD/yyyy"
                    value={field.id === 'startDate' ? startFrom : endFrom}
                    InputAdornmentProps={{ position: 'start' }}
                    onChange={
                      field.id === 'startDate'
                        ? date => {
                            handleStartFrom(date);

                            setFilters({
                              ...filters,

                              [`${field.id}From`]: date
                            });
                          }
                        : date => {
                            handleEndFrom(date);

                            setFilters({
                              ...filters,

                              [`${field.id}From`]: date
                            });
                          }
                    }
                  />

                  <KeyboardDatePicker
                    className={classes.filterItem}
                    autoOk
                    variant="inline"
                    inputVariant="outlined"
                    label="To"
                    format="MM/DD/yyyy"
                    value={field.id === 'startDate' ? startTo : endTo}
                    InputAdornmentProps={{ position: 'start' }}
                    onChange={
                      field.id === 'startDate'
                        ? date => {
                            handleStartTo(date);

                            setFilters({
                              ...filters,

                              [`${field.id}To`]: date
                            });
                          }
                        : date => {
                            handleEndTo(date);

                            setFilters({
                              ...filters,

                              [`${field.id}To`]: date
                            });
                          }
                    }
                  />
                </div>
              </MuiPickersUtilsProvider>
            );
          }

          return (
            <TextField
              className={classes.filterItem}
              id={field.id}
              label={field.label}
              type="search"
              variant="outlined"
              onChange={e =>
                setFilters({ ...filters, [field.id]: e.currentTarget.value })}
            />
          );
        })}

        <Button
          className={classes.applyButton}
          variant="contained"
          color="primary"
          onClick={() => {
            handleFilter(filters);

            handleClose();
          }}
        >
          Apply
        </Button>
      </form>
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.func.isRequired,
  handleFilter: PropTypes.func.isRequired,
  selectedValue: PropTypes.string.isRequired,
  fields: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default function FilterForm(props) {
  const { fields, filterOpen, handleClose, handleFilter } = props;

  return (
    <div>
      <SimpleDialog
        fields={fields}
        open={filterOpen}
        onClose={handleClose}
        handleFilter={handleFilter}
      />
    </div>
  );
}

FilterForm.propTypes = {
  fields: PropTypes.arrayOf(PropTypes.object).isRequired,

  filterOpen: PropTypes.func.isRequired,

  handleClose: PropTypes.func.isRequired,

  handleFilter: PropTypes.func.isRequired
};
