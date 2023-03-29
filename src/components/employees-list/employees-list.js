import EmployeesListItem from "../employees-list-item/employees-list-item";

import './employees-list.scss';

const EmployeesList = ({data, onDelete, onToggleProp, onUpdateSalary}) => {

    const elements = data.map(item => {
        const {...itemProps} = item;
        return <EmployeesListItem
                    key={item.id}
                    {...itemProps}
                    onDelete={() => onDelete(item.id)}
                    onToggleProp={(e) => onToggleProp(item.id, e.currentTarget.dataset.toggle)}
                    onUpdateSalary={onUpdateSalary}/>
    });

    return (
        <ul className="app-list list-group">
            {elements}
        </ul>
    );
}

export default EmployeesList;
