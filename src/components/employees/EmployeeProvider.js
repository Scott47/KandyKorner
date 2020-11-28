import React, {useState} from "react"

export const EmployeeContext = React.createContext()

export const EmployeeProvider = (props) => {
    const [employees, setEmployees] = useState([])

    // created state variable set to value of false
    const [ position, setPosition ] = useState(false);

    const getEmployees = () => {
        console.log(setPosition, setEmployees)
        return fetch("http://localhost:8088/employees")
        .then(res => res.json())
        .then(setEmployees)

    }

    const addEmployee = (employee) => {
        return fetch("http://localhost:8088/employees", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(employee)
        })
        .then(getEmployees)
    }

    return (
        <EmployeeContext.Provider value={{employees, getEmployees, addEmployee, position, setPosition}}>
            {props.children}
        </EmployeeContext.Provider>
    )
}