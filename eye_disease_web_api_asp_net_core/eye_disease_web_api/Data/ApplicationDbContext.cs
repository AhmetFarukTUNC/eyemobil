using Microsoft.EntityFrameworkCore;
using EyeAI.API.Models;

namespace EyeAI.API.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(
            DbContextOptions<ApplicationDbContext> options
        ) : base(options)
        {
        }

        public DbSet<Patient> Patients { get; set; }

        public DbSet<Prediction> Predictions { get; set; }

        public DbSet<User> Users { get; set; }

        public DbSet<ContactMessage> ContactMessages { get; set; }


        protected override void OnModelCreating(
            ModelBuilder modelBuilder
        )
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Patient>()
                .HasOne(p => p.User)
                .WithMany(u => u.Patients)
                .HasForeignKey(p => p.UserId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}