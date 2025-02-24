import React, { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "./ui/dialog";
import { Input } from "./ui/input";
import { Alert } from "./ui/alert";
import './BookManagement.css';

interface Book {
  id: number;
  title: string;
  author: string;
}

const BookManager: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [newBook, setNewBook] = useState({ title: "", author: "" });
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [bookToDelete, setBookToDelete] = useState<Book | null>(null);
  const [isOpen, setIsOpen] = useState(false);
;

  useEffect(() => {
    const savedBooks = localStorage.getItem("books");
    if (savedBooks) {
      setBooks(JSON.parse(savedBooks));
    }
  }, []);

  useEffect(() => {
    if (books.length > 0) {
      localStorage.setItem("books", JSON.stringify(books));
    }
  }, [books]);

  const handleCreateBook = () => {
    const newEntry = { id: Date.now(), ...newBook };
    setBooks((prevBooks) => [...prevBooks, newEntry]);
    setIsCreateModalOpen(false);
    setNewBook({ title: "", author: "" });
  };

  const handleDeleteBook = (id: number) => {
    setBooks((prevBooks) => {
      const updatedBooks = prevBooks.filter((book) => book.id !== id);
      return updatedBooks;
    });
    setBookToDelete(null);
  };

  return (
    <div className="p-4">
      <Button onClick={() => setIsCreateModalOpen(true)}>Adicionar Livro</Button>
      <Table className="mt-4">
        <TableHeader>
          <TableRow>
            <TableHead>Título</TableHead>
            <TableHead>Autor</TableHead>
            <TableHead>Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {books.map((book) => (
            <TableRow key={book.id}>
              <TableCell>{book.title}</TableCell>
              <TableCell>{book.author}</TableCell>
              <TableCell>
                <Button onClick={() => { setSelectedBook(book); setIsDetailModalOpen(true); }}>Detalhes</Button>
                <Button variant="destructive" onClick={() => setBookToDelete(book)}>Excluir</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Modal de criação */}
      <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
        <div className="dialog-overlay" onClick={() => setIsCreateModalOpen(false)}></div>
        <div className="dialog-content" onClick={(e) => e.stopPropagation()}>
        <DialogContent>
          <DialogHeader onClose={() => setIsOpen(false)}>
            <DialogTitle>Criar Livro</DialogTitle>
          </DialogHeader>
          <Input placeholder="Título" value={newBook.title} onChange={(e) => setNewBook({ ...newBook, title: e.target.value })} />
          <Input placeholder="Autor" value={newBook.author} onChange={(e) => setNewBook({ ...newBook, author: e.target.value })} />
          <DialogFooter>
            <Button onClick={handleCreateBook}>Criar</Button>
          </DialogFooter>
        </DialogContent>
        </div>
      </Dialog>

{/* Modal de detalhes */}
<Dialog open={isDetailModalOpen} onOpenChange={setIsDetailModalOpen}>
  <div className="dialog-overlay" onClick={() => setIsCreateModalOpen(false)}></div>
  <div className="dialog-content" onClick={(e) => e.stopPropagation()}>
  <DialogContent >
    <DialogHeader onClose={() => setIsDetailModalOpen(false)}>
      <DialogTitle>Detalhes do Livro</DialogTitle>
    </DialogHeader>
    {selectedBook && (
      <Card>
        <CardContent>
          <p><strong>Título:</strong> {selectedBook.title}</p>
          <p><strong>Autor:</strong> {selectedBook.author}</p>
        </CardContent>
      </Card>
    )}
    <div className="button-close">
    <Button variant="destructive" onClick={() => setIsDetailModalOpen(false)}>X</Button>
    </div>
  </DialogContent>
  </div>
</Dialog>


      {/* Alerta de confirmação para exclusão */}
      {bookToDelete && (
        <div className="dialog-content" onClick={(e) => e.stopPropagation()}>
        <Alert>
          <p>Tem certeza que deseja excluir o livro "{bookToDelete.title}"?</p>
          <div>
          <Button variant="destructive" onClick={() => handleDeleteBook(bookToDelete.id)}>Confirmar</Button>
          <Button onClick={() => setBookToDelete(null)}>Cancelar</Button>
          </div>
        </Alert>
        </div>
      )}
    </div>
  );
};

export default BookManager;
