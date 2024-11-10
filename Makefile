all: serve

backend:
	@echo "Starting backend . . ."
	cd backend && php artisan serve

frontend:
	@echo "Starting frontend . . ."
	cd frontend && bun start

serve:
	$(MAKE) backend &
	$(MAKE) frontend &
	wait
