import {employeeModel} from '../model/employee'
import {Request,Response,NextFunction} from "express"
const Employee = employeeModel


export const createEmployee =  (req: Request, res:Response, next:NextFunction) => {
    const newEmployee = new Employee({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        gender: req.body.gender,
        birth: req.body.birth,
        phoneNumber: req.body.phoneNumber,
        city: req.body.city,
        position: req.body.position,
        company: req.body.company
    });

    newEmployee.save()
    .then(savedEmployee => {
        return res.json(savedEmployee)
    })
        // .catch(err => {
            // return next(createError(500, err.message));
        // });
    // .catch(err => {
        // return next(createError(500, err.message));
    // });
};

export const readEmployee = (req: Request, res:Response, next:NextFunction) => {
    Employee.findOne({_id:req.params.id})
    .then(employee => res.json(employee))
    // .catch(err => {
    //     return next(createError(500, err.message));
    // });
}

export const deleteEmployee = (req: Request, res:Response, next:NextFunction) => {
    Employee.deleteOne({_id:req.params.id})
    .then(employee => res.json(employee))
    // .catch(err => {
    //     return next(createError(500, err.message));
    // });
}

export const updateEmployee = (req:Request,res:Response,next:NextFunction) => {
    const updatedEmployee = req.body

    if (!!req.body.firstName) updatedEmployee.firstName = req.body.firstName
    if (!!req.body.lastName) updatedEmployee.lastName = req.body.lastName
    if (!!req.body.gender) updatedEmployee.gender = req.body.gender
    if (!!req.body.birth) updatedEmployee.birth = req.body.birth
    if (!!req.body.phoneNumber) updatedEmployee.phoneNumber = req.body.phoneNumber
    if (!!req.body.city) updatedEmployee.city = req.body.city
    if (!!req.body.position) updatedEmployee.position = req.body.position
    if (!!req.body.company) updatedEmployee. company = req.body.company

    Employee.updateOne({_id:req.params.id},updatedEmployee)
    .then(employee => res.json(employee))
    // .catch(err => {
    //     return next(createError(500, err.message));
    // });
}

// const allEmployeePage = (req,res,next) => {
//     Employee.find({company:req.params.filter},{__v: 0,createdAt:0}).populate("company")
//     .then(employees => res.render("employee",{data:[...employees]}))
//     .catch(err => {
//         return next(createError(500, err.message));
//     });
// }