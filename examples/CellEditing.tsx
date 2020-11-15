import React, { useState } from 'react';
import {
  Grid,
  useColumns,
  CellComponents,
  useClientRows,
  CellEditor,
  Read,
  Write,
  DerivedColumn,
  NormalRow,
} from '@puregrid/core';

interface Person {
  uid: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
}

export function CellEditing() {
  const { columns, setColumns } = useColumns<Person>([
    {
      key: 'firstName',
      header: 'First name',
      width: '1fr',
      minWidth: 120,
      cellComponent: 'textInput',
      getValue: person => person.firstName,
      setValue: (person: Person, newValue: string) => ({
        ...person,
        firstName: newValue,
      }),
    },
    {
      key: 'lastName',
      header: 'Last name',
      width: '1fr',
      minWidth: 120,
      cellComponent: 'textInput',
      getValue: person => person.lastName,
      setValue: (person: Person, newValue: string) => ({
        ...person,
        lastName: newValue,
      }),
    },
    {
      key: 'dateOfBirth',
      header: 'Date Of Birth',
      width: 160,
      cellComponent: 'textInput',
      cellComponentInputType: 'date',
      getValue: person => person.dateOfBirth,
      setValue: (person: Person, newValue: string) => ({
        ...person,
        dateOfBirth: newValue,
      }),
    },
  ]);
  const [data, setData] = useState<Person[]>([
    {
      uid: 'H87rioH9sa',
      firstName: 'Harry',
      lastName: 'Mack',
      dateOfBirth: '1988-12-02',
    },
    {
      uid: 'Fmgw8A3cF8y',
      firstName: 'Peter',
      lastName: 'Peterson',
      dateOfBirth: '1974-02-20',
    },
  ]);

  const rows = useClientRows<Person>({
    columns,
    data,
    getItemId: person => person.uid,
  });

  function updateValue(
    column: DerivedColumn<Person>,
    row: NormalRow<Person>,
    newValue: unknown
  ) {
    if (column.setValue) {
      setData(people =>
        people.map(person => {
          if (person.uid === row.key) {
            return column.setValue(person, newValue);
          }
          return person;
        })
      );
    } else {
      throw new Error(`No setValue function defined for ${column.key}`);
    }
  }

  const cellComponents: CellComponents = {
    textInput: ({ column, row }) => (
      <CellEditor>
        <Read>{column.getValue(row.data)}</Read>
        <Write
          value={column.getValue(row.data)}
          onCommit={newValue => updateValue(column, row, newValue)}
        >
          {({ intermediateValue, setIntermediateValue }) => (
            <input
              type={column.cellComponentInputType || 'text'}
              value={intermediateValue}
              onChange={e => setIntermediateValue(e.currentTarget.value)}
            />
          )}
        </Write>
      </CellEditor>
    ),
  };

  return (
    <Grid<Person>
      columns={columns}
      onColumnsChange={setColumns}
      rows={rows}
      cellComponents={cellComponents}
    />
  );
}
