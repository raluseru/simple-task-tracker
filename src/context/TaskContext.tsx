import React, { useMemo, useEffect, createContext, useState, useContext } from "react"
import { PriorityType, TaskType } from "../types"
import { reorderTasks } from "../services/dragAndDropUtils"

interface TaskContextType {
    tasks: TaskType[]
    query: string
    filteredTasks: TaskType[]
    filter: "all" | PriorityType.Low | PriorityType.Medium | PriorityType.High
    setFilter: (priority: any) => void
    setQuery: (query: string) => void
    addTask: (task: TaskType) => void
    deleteTask: (id: number) => void
    updateTask: (id: number, updatedTask: TaskType) => void
    reorderTaskList: (sourceIndex: number, destinationIndex: number) => void
}

const TaskContext = createContext<TaskContextType | undefined>(undefined)

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [tasks, setTasks] = useState<TaskType[]>([])
    const [filter, setFilter] = useState<"all" | PriorityType.Low | PriorityType.Medium | PriorityType.High>("all")
    const [query, setQuery] = useState("")

    // Load tasks from localStorage on initial render
    const loadTasksFromLocalStorage = () => {
        const savedTasks = localStorage.getItem("tasks")
        if (savedTasks && savedTasks.length) {
            return JSON.parse(savedTasks).map((task: any) => ({
                ...task,
                priority: Number(task.priority) as PriorityType,
            }))
        }
        return []
    }

    useEffect(() => {
        const tasksFromLocalStorage = loadTasksFromLocalStorage()
        setTasks(tasksFromLocalStorage)
    }, [])

    // Save tasks to localStorage
    useEffect(() => {
        if (tasks.length > 0) {
            localStorage.setItem("tasks", JSON.stringify(tasks))
        }
    }, [tasks])


    const addTask = (task: TaskType) => {
        setTasks((prevTasks) => [...prevTasks, task])
    }

    const deleteTask = (id: number) => {
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id))
    }

    const updateTask = (id: number, updatedTask: TaskType) => {
        setTasks((prevTasks) =>
            prevTasks.map((task) => (task.id === id ? updatedTask : task))
        )
    }

    const reorderTaskList = (sourceIndex: number, destinationIndex: number) => {
        const reorderedTasks = reorderTasks(tasks, sourceIndex, destinationIndex)
        setTasks(reorderedTasks)
    }

    const filteredTasks = useMemo(() => {
        return tasks.filter((task) => {
            if (query.length) {
                const taskMatchesQuery =
                    task.title.toLowerCase().includes(query.toLowerCase()) ||
                    task.description.toLowerCase().includes(query.toLowerCase())
                if (filter === "all") {
                    return taskMatchesQuery
                }
                return taskMatchesQuery && task.priority === Number(filter)
            } else {
                if (filter === "all") return true
                return task.priority === Number(filter)
            }
        })
    }, [tasks, query, filter])

    return (
        <TaskContext.Provider value={{
            addTask,
            updateTask,
            deleteTask,
            filter,
            reorderTaskList,
            setFilter,
            query,
            setQuery,
            filteredTasks,
            tasks
        }}>
            {children}
        </TaskContext.Provider>
    )
}

export const useTaskContext = () => {
    const context = useContext(TaskContext)
    if (!context) {
        throw new Error("useTaskContext must be used within a TaskProvider")
    }
    return context
} 
