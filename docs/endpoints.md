# Existing Endpoints

The following endpoints have been defined for you however the logic within may not be complete;

```php
Route::get('documents', [DocumentController::class, 'index']);
Route::post('documents', [DocumentController::class, 'store']);
Route::get('documents/{document}', [DocumentController::class, 'show']);
```

:::tip
Feel free to create or modify these endpoints.
:::

- The API endpoints are nested under the `api` prefix - for example `/api/documents/5`.
- Routes are protected using the Sanctum package from Laravel.
- You should not need to add or edit any authentication routes. You can log in by posting to the `/login` endpoint which is provided by Laravel Fortify.
