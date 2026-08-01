"use client"

import { useState, useTransition } from "react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus, Pencil, Trash2 } from "lucide-react"
import { Category, createCategory, deleteCategory, updateCategory } from "../../_actions/adminActions"

interface CategoryTableProps {
    initialCategories: Category[]
}

export function CategoryTable({ initialCategories }: CategoryTableProps) {
    const [categories, setCategories] = useState<Category[]>(initialCategories)
    const [isPending, startTransition] = useTransition()
    const [dialogOpen, setDialogOpen] = useState(false)
    const [editingCategory, setEditingCategory] = useState<Category | null>(null)
    const [name, setName] = useState("")
    const [deleteTarget, setDeleteTarget] = useState<Category | null>(null)

    const openAddDialog = () => {
        setEditingCategory(null)
        setName("")
        setDialogOpen(true)
    }

    const openEditDialog = (category: Category) => {
        setEditingCategory(category)
        setName(category.name)
        setDialogOpen(true)
    }

    const handleSubmit = () => {
        if (!name.trim()) {
            toast.error("Category name is required")
            return
        }

        startTransition(async () => {
            if (editingCategory) {
                const res = await updateCategory(editingCategory.id, { name })
                if (res.success && res.data?.category) {
                    const updated = res.data.category
                    setCategories((prev) =>
                        prev.map((c) => (c.id === editingCategory.id ? updated : c))
                    )
                    toast.success(res.message)
                    setDialogOpen(false)
                } else {
                    toast.error(res.message)
                }
            } else {
                const res = await createCategory({ name })
                if (res.success && res.data?.category) {
                    const created = res.data.category
                    setCategories((prev) => [...prev, created])
                    toast.success(res.message)
                    setDialogOpen(false)
                } else {
                    toast.error(res.message)
                }
            }
        })
    }

    const handleDelete = () => {
        if (!deleteTarget) return

        startTransition(async () => {
            const res = await deleteCategory(deleteTarget.id)
            if (res.success) {
                setCategories((prev) => prev.filter((c) => c.id !== deleteTarget.id))
                toast.success(res.message)
            } else {
                toast.error(res.message)
            }
            setDeleteTarget(null)
        })
    }

    return (
        <>
            <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Categories</h2>
                <Button onClick={openAddDialog} size="sm">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Category
                </Button>
            </div>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Created At</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {categories.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={3} className="text-center text-muted-foreground">
                                No categories yet.
                            </TableCell>
                        </TableRow>
                    ) : (
                        categories.map((category) => (
                            <TableRow key={category.id}>
                                <TableCell>{category.name}</TableCell>
                                <TableCell>
                                    {new Date(category.createdAt).toLocaleDateString()}
                                </TableCell>
                                <TableCell className="text-right space-x-2">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => openEditDialog(category)}
                                    >
                                        <Pencil className="h-4 w-4" />
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => setDeleteTarget(category)}
                                    >
                                        <Trash2 className="h-4 w-4 text-destructive" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>

            {/* Add / Edit Dialog */}
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            {editingCategory ? "Edit Category" : "Add Category"}
                        </DialogTitle>
                    </DialogHeader>

                    <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="e.g. New building"
                            disabled={isPending}
                        />
                    </div>

                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => setDialogOpen(false)}
                            disabled={isPending}
                        >
                            Cancel
                        </Button>
                        <Button onClick={handleSubmit} disabled={isPending}>
                            {isPending ? "Saving..." : editingCategory ? "Update" : "Create"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Delete confirmation */}
            <AlertDialog open={!!deleteTarget} onOpenChange={(open) => !open && setDeleteTarget(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Delete category?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This will permanently delete &quot;{deleteTarget?.name}&quot;. This action
                            cannot be undone.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDelete} disabled={isPending}>
                            {isPending ? "Deleting..." : "Delete"}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}