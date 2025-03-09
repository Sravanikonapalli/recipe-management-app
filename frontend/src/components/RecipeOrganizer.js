import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import '../styles/recipeOrganizer.css'
const API_URL = 'https://recipe-management-app-q93w.onrender.com/recipes';

function transformBackendData(dataArray) {
  const recipes = {};
  const categories = {};

  dataArray.forEach((recipe) => {
    const recipeKey = `recipe-${recipe.id}`;
    recipes[recipeKey] = { id: recipeKey, title: recipe.title };
    const categoryList = recipe.categories.split(',').map((cat) => cat.trim());
    const primaryCategory = categoryList[0] || 'Uncategorized';

    if (!categories[primaryCategory]) {
      categories[primaryCategory] = { id: primaryCategory, title: primaryCategory, recipeIds: [] };
    }
    categories[primaryCategory].recipeIds.push(recipeKey);
  });

  const categoryOrder = Object.keys(categories).sort();
  return { recipes, categories, categoryOrder };
}

function RecipeOrganizer() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(API_URL)
      .then((response) => response.json())
      .then((fetchedData) => {
        const transformedData = transformBackendData(fetchedData);
        console.log('Transformed Data:', transformedData);
        setData(transformedData);
      })
      .catch((error) => console.error('Error fetching recipes:', error));
  }, []);

  useEffect(() => {
    if (data) {
      console.log('Recipe keys:', Object.keys(data.recipes));
    }
  }, [data]);

  if (!data) return <div>Loading...</div>;

  const onDragEnd = (result) => {
    console.log('Drag ended:', result);
    const { destination, source, draggableId } = result;
    if (!destination) return;
    if (destination.droppableId === source.droppableId &&
        destination.index === source.index)
      return;

    setData((prevData) => {
      const startCategory = prevData.categories[source.droppableId];
      const finishCategory = prevData.categories[destination.droppableId];

      if (startCategory === finishCategory) {
        const newRecipeIds = Array.from(startCategory.recipeIds);
        newRecipeIds.splice(source.index, 1);
        newRecipeIds.splice(destination.index, 0, draggableId);
        const newCategory = { ...startCategory, recipeIds: newRecipeIds };

        return {
          ...prevData,
          categories: {
            ...prevData.categories,
            [newCategory.id]: newCategory,
          },
        };
      } else {
        const startRecipeIds = Array.from(startCategory.recipeIds);
        startRecipeIds.splice(source.index, 1);
        const newStart = { ...startCategory, recipeIds: startRecipeIds };

        const finishRecipeIds = Array.from(finishCategory.recipeIds);
        finishRecipeIds.splice(destination.index, 0, draggableId);
        const newFinish = { ...finishCategory, recipeIds: finishRecipeIds };

        return {
          ...prevData,
          categories: {
            ...prevData.categories,
            [newStart.id]: newStart,
            [newFinish.id]: newFinish,
          },
        };
      }
    });
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div style={{ display: 'flex', padding: '20px' }}>
        {data.categoryOrder.map((categoryId) => {
          const category = data.categories[categoryId];
          return (
            <Droppable droppableId={category.id} key={category.id} isDropDisabled={false}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  style={{
                    background: snapshot.isDraggingOver ? '#e0f7fa' : '#f0f0f0',
                    padding: 8,
                    width: 250,
                    minHeight: 200,
                    margin: '0 10px',
                    borderRadius: '4px',
                  }}
                >
                  <h3 style={{ textAlign: 'center' }}>{category.title}</h3>
                  {category.recipeIds.map((recipeId, index) => {
                    console.log('Mapping recipeId:', recipeId, data.recipes[recipeId]);
                    const recipe = data.recipes[recipeId];
                    if (!recipe) {
                      console.error(`Recipe with id ${recipeId} not found`);
                      return null;
                    }
                    return (
                      <Draggable key={recipe.id} draggableId={recipe.id} index={index}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={{
                              userSelect: 'none',
                              padding: 16,
                              margin: '0 0 8px 0',
                              background: snapshot.isDragging ? '#ffd54f' : '#ffffff',
                              boxShadow: snapshot.isDragging ? '0 0 10px rgba(0,0,0,0.5)' : 'none',
                              border: '1px solid #ccc',
                              borderRadius: '4px',
                              cursor: snapshot.isDragging ? 'grabbing' : 'grab',
                              ...provided.draggableProps.style,
                            }}
                          >
                            {recipe.title}
                          </div>
                        )}
                      </Draggable>
                    );
                  })}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          );
        })}
      </div>
    </DragDropContext>
  );
}

export default RecipeOrganizer;
