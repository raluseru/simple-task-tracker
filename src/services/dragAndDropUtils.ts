import { TaskType } from "../types"

export const reorderTasks = (
    tasks: TaskType[],
    sourceIndex: number,
    destinationIndex: number
): TaskType[] => {
    const reorderedTasks = Array.from(tasks)
    const [movedTask] = reorderedTasks.splice(sourceIndex, 1)
    reorderedTasks.splice(destinationIndex, 0, movedTask)
    return reorderedTasks
}