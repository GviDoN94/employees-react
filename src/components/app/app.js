import { Component } from 'react';

import AppInfo from '../app-info/app-info';
import SearchPanel from '../search-panel/search-panel';
import AppFilter from '../app-filter/app-filter';
import EmployeesList from '../employees-list/employees-list';
import EmployeesAddForm from '../employees-add-form/employees-add-form';

import './app.scss';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                {name: 'Jhon C.', salary: 800, increase: false, rise: true, id: 1},
                {name: 'Alex M.', salary: 3000, increase: true, rise: false, id: 2},
                {name: 'Carl W.', salary: 5000, increase: false, rise: false, id: 3}
            ],
            term: '',
            filter: 'all'
        }
    }

    deleteItem = (id) => {
        this.setState(({data}) => ({
            data: data.filter(item => item.id !== id),
        }))
    }

    getNewId = (arr) => {
        let maxId = 0;
        arr.forEach(item => maxId = item.id > maxId ? item.id : maxId);
        return maxId + 1;
    }

    addItem = (name, salary) => {
        const newItem = {
            name,
            salary,
            increase: false,
            rise: false,
            id: this.getNewId(this.state.data)
        }
        this.setState(({data}) => {
            const newArr = [...data, newItem];
            return {data: newArr}
        })
    }

    onToggleProp = (id, prop) => {
        this.setState(({data}) => ({
            data: data.map(item => {
                if (item.id === id) {
                    return {...item, [prop]: !item[prop]}
                }
                return item;
            })
        }))
    }

    onUpdateSalary = (id, newSalary) => {
        this.setState(({data}) => ({
            data: data.map(item => {
                if (item.id === id) {
                    const salary = newSalary ? newSalary : 0
                    return {...item, salary}
                }
                return item;
            })
        }))
    }

    filterEmployees = (items, prop) => {
        switch (prop) {
            case 'rise':
                return items.filter(item => item.rise);
            case 'moreThen1000':
                return items.filter(item => item.salary > 1000)
            default:
                return items;

        }
    }

    onFilterSelect = (filter) => {
        this.setState({filter});
    }

    searchEmployees = (items, term) => {
        if (term.length === 0) {
            return items;
        }

        return items.filter(item => item.name.indexOf(term) > -1);
    }

    onUpdateSearch = (term) => {
        this.setState({term});
    }

    render() {
        const {data, filter, term} = this.state
        const employees = data.length;
        const increaced = data.filter(item => item.increase).length;
        const visibleData = this.filterEmployees(this.searchEmployees(data, term), filter);
        return (
            <div className="app">
                <AppInfo employees={employees} increaced={increaced}/>
    
                <div className="search-panel">
                    <SearchPanel onUpdateSearch={this.onUpdateSearch}/>
                    <AppFilter filter={filter} onFilterSelect={this.onFilterSelect}/>
                </div>
    
                <EmployeesList
                    data={visibleData}
                    onDelete={this.deleteItem}
                    onToggleProp={this.onToggleProp}
                    onUpdateSalary={this.onUpdateSalary}/>
                <EmployeesAddForm onAdd={this.addItem}/>
            </div>
        );
    }
}

export default App;
