using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

#nullable disable

namespace VictoryProject.Entity
{
    public partial class VictoryContext : DbContext
    {
        public VictoryContext(DbContextOptions options)
            : base(options)
        {
        }

        public virtual DbSet<Contest> Contests { get; set; }
        public virtual DbSet<Role> Roles { get; set; }
        public virtual DbSet<User> Users { get; set; }
        public virtual DbSet<UserRoleContest> UserRoleContests { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseOracle("Data Source=(DESCRIPTION=(ADDRESS_LIST=(ADDRESS=(PROTOCOL=TCP)(HOST=WIN-PV0PI036QR8.dmd.local)(PORT=1521)))(CONNECT_DATA=(SERVER=DEDICATED)(SERVICE_NAME=XE)));User Id=C##MAX;Password=1234;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasDefaultSchema("C##MAX")
                .HasAnnotation("Relational:Collation", "USING_NLS_COMP");

            modelBuilder.Entity<Contest>(entity =>
            {
                entity.ToTable("CONTEST");

                entity.Property(e => e.Id)
                    .HasPrecision(9)
                    .HasColumnName("ID");

                entity.Property(e => e.Comment).HasColumnName("COMMENT");

                entity.Property(e => e.EndDate)
                    .HasColumnType("DATE")
                    .HasColumnName("END_DATE");

                entity.Property(e => e.EndRegistrationDate)
                    .HasColumnType("DATE")
                    .HasColumnName("END_REGISTRATION_DATE");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(500)
                    .HasColumnName("NAME");

                entity.Property(e => e.StartDate)
                    .HasColumnType("DATE")
                    .HasColumnName("START_DATE");

                entity.Property(e => e.StartRegistrationDate)
                    .HasColumnType("DATE")
                    .HasColumnName("START_REGISTRATION_DATE");
            });

            modelBuilder.Entity<Role>(entity =>
            {
                entity.ToTable("ROLE");

                entity.Property(e => e.Id)
                    .HasPrecision(4)
                    .ValueGeneratedOnAdd()
                    .HasColumnName("ID");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(500)
                    .HasColumnName("NAME");
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.ToTable("USER");

                entity.Property(e => e.Id)
                    .HasPrecision(9)
                    .HasColumnName("ID");

                entity.Property(e => e.Password)
                    .IsRequired()
                    .HasMaxLength(50)
                    .HasColumnName("PASSWORD");

                entity.Property(e => e.Username)
                    .IsRequired()
                    .HasMaxLength(50)
                    .HasColumnName("USERNAME");
                entity.Property(e => e.Email)
                    .IsRequired()
                    .HasMaxLength(50)
                    .HasColumnName("EMAIL");
            });

            modelBuilder.Entity<UserRoleContest>(entity =>
            {
                entity.ToTable("USER_ROLE_CONTEST");

                entity.Property(e => e.Id)
                    .HasPrecision(18)
                    .HasColumnName("ID");

                entity.Property(e => e.ContestId)
                    .HasPrecision(9)
                    .HasColumnName("CONTEST_ID");

                entity.Property(e => e.RoleId)
                    .HasPrecision(4)
                    .HasColumnName("ROLE_ID");

                entity.Property(e => e.UserId)
                    .HasPrecision(9)
                    .HasColumnName("USER_ID");

                entity.HasOne(d => d.Contest)
                    .WithMany(p => p.UserRoleContests)
                    .HasForeignKey(d => d.ContestId)
                    .HasConstraintName("FK_USER_ROLE_CONTEST_CONTEST_ID");

                entity.HasOne(d => d.Role)
                    .WithMany(p => p.UserRoleContests)
                    .HasForeignKey(d => d.RoleId)
                    .HasConstraintName("FK_USER_ROLE_CONTEST_ROLE_ID");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.UserRoleContests)
                    .HasForeignKey(d => d.UserId)
                    .HasConstraintName("FK_USER_ROLE_CONTEST_USER_ID");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
